import { CSSProperties, ReactElement, Reducer, useContext, useReducer, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { calculateTax, getCartTotal, toCurrency } from '../data/utilities';
import { placeOrder as placeOrderToServer } from '../data/repository';
import { CartItem } from '../types/CartItem';
import { User } from '../types/User';
import { UserContext } from '../App';

interface Props {
  cart: Array<CartItem>;
  changeCartItem: (cartItem: CartItem) => void;
  removeFromCart: (cartItem: CartItem) => void;
}

// We *could* add tip, area, location, etc. if desired 
type State = {
  cvv: number | undefined;
  expiryMonth: number | undefined;
  expiryYear: number | undefined;
  pan: string;
  panIsValid: boolean;
}
type Action = {
  type: string;
  payload?: any;
}
// Reducer function merely returns a *copy* of the state object so far
const reducer = (state: State, action: Action = { type: "" }): State => {
  console.log({ state, action }) // Debugging only - Remove eventually
  switch (action.type) {
    case "SET_CVV":
      return { ...state, cvv: action.payload.cvv };
    case "SET_EXPIRY_MONTH":
      const expiryYear = state.expiryYear ? state.expiryYear : new Date().getFullYear();
      return { ...state, expiryMonth: action.payload.month, expiryYear };
    case "SET_EXPIRY_YEAR":
      return { ...state, expiryYear: action.payload.year, expiryMonth: state.expiryMonth || new Date().getMonth() };
    case "SET_PAN":
      let isValid = validateLuhn(action.payload.pan);
      return { ...state, pan: action.payload.pan, panIsValid: isValid };
    default:
      return { ...state };
  }
}

export const Cart = ({ cart, changeCartItem, removeFromCart }: Props): ReactElement => {
  const user: User | undefined = useContext(UserContext)
  const navigate = useNavigate();
  const [tip, setTip] = useState<number | undefined>(undefined);
  const [area, setArea] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const initState = {
    cvv: undefined,
    expiryMonth: user?.creditCard?.expiryMonth,
    expiryYear: user?.creditCard?.expiryYear,
    pan: "",
    panIsValid: false,
  };

  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initState);

  const panRef = useRef<HTMLInputElement>(null);
  panRef.current && panRef.current.setCustomValidity(state.panIsValid ? '' : 'Bad credit card number');

  return (
    <section className="Cart">
      <h1>Cart</h1>
      <Link to="/">Order more</Link>
      {cart.map((ci) => (
        <section key={ci.id} style={styles.itemWrapper}>
          <h2 style={styles.itemName}>{ci.name}</h2>
          <p style={styles.price}>{ci.price}</p>
          <p style={styles.category}>{ci.category}</p>
          <label style={styles.for}>For<input value={ci.firstName || ""} onChange={e => setFirstName(e.target.value, ci)} style={styles.input} /></label>
          <label style={styles.requests}>Special requests
            <textarea value={ci.notes} onChange={e => setNotes(e.target.value, ci)} style={styles.textarea}></textarea>
          </label>
          <button onClick={() => removeFromCart(ci)} style={styles.button}>Remove</button>
        </section>
      ))}
      <section>
        <p>Tax: {toCurrency(calculateTax(getCartTotal(cart)))}</p>
        <p>Total: {toCurrency(getCartTotal(cart) + calculateTax(getCartTotal(cart)))}</p>
        <div>Tip: <input value={tip ?? ''} onChange={e => setTip(+e.target.value)} type="number" step="0.01" min="0.00" /></div>
        <p>Amount to charge: {toCurrency(getCartTotal(cart) + calculateTax(getCartTotal(cart)) + (tip || 0))}</p>
      </section>
      <section>
        <label htmlFor='id'>Deliver to...</label>
        <select value={area} id="area" onChange={e => setArea(e.target.value)}>
          {['Theater 1', 'Theater 2', 'Theater 3', 'Theater 4', 'Theater 5', 'Theater 6', 'Takeout',].map(area => <option value={area} key={area}>{area}</option>)}
        </select>
        <label htmlFor="location">Location (like table number)</label>
        <input value={location} onChange={e => setLocation(e.target.value)} id="location" />
      </section>
      <section>
        <h2>Payment</h2>
        <h3>Credit card</h3>
        <div className="formField">
          <label htmlFor="pan">Number</label>
          <input ref={panRef} value={state.pan} onChange={e => dispatch({ type: "SET_PAN", payload: { pan: e.target.value } })} id="pan" required />
        </div>
        <div className="formField">
          <label htmlFor="expiryMonth">Month</label>
          <input value={state.expiryMonth ?? ''} onChange={e => dispatch({ type: "SET_EXPIRY_MONTH", payload: { month: +e.target.value } })} type="number" id="expiryMonth" required />
          <label htmlFor="expiryYear">Year</label>
          <input value={state.expiryYear ?? ''} onChange={e => dispatch({ type: "SET_EXPIRY_YEAR", payload: { year: +e.target.value } })} type="number" id="expiryYear" required />
        </div>
        <div className="formField">
          <label htmlFor="cvv">CVV</label>
          <input value={state.cvv ?? ''} onChange={e => dispatch({ type: "SET_CVV", payload: { cvv: +e.target.value } })} type="number" id="cvv" required />
        </div>

        <button onClick={placeOrder}>Place order</button>
      </section>
    </section>
  )
  function placeOrder() {
    const newOrder = { cart, tip, pan: state.pan, expiryMonth: state.expiryMonth, expiryYear: state.expiryYear, cvv: state.cvv, area, location };
    placeOrderToServer(newOrder)
      .then(res => {
        const orderId = res.id;
        navigate(`/orders/${orderId}`);
      })
  }
  function setFirstName(firstName: string, ci: CartItem) {
    const newCartItem = { ...ci, firstName }
    changeCartItem(newCartItem);
  }
  function setNotes(notes: string, ci: CartItem) {
    const newCartItem = { ...ci, notes }
    changeCartItem(newCartItem);
  }

}

function validateLuhn(pan: string): boolean {
  // Remove spaces and dashes
  pan = pan.replace(/\s+/g, '').replace(/-/g, '');
  if (pan.length < 13 || pan.length > 19) {
    return false;
  }
  let sum = 0;
  let isDoubled = false;
  for (let i = pan.length - 1; i >= 0; i--) {
    let digit = +pan[i];
    if (isDoubled) {
      digit *= 2;
      if (digit > 9)
        digit -= 9;
    }
    sum += digit;
    isDoubled = !isDoubled;
  }
  console.log(sum, sum % 10 === 0)
  return sum % 10 === 0;
}


const styles: { [P: string]: CSSProperties } = {
  itemWrapper: {
    backgroundColor: 'var(--light2)',
    padding: "auto 20px", margin: "20px auto",
    border: '1px solid var(--dark1)',
    display: 'grid',
    gridTemplateColumns: "6fr 3fr",
    gridTemplateRows: "auto auto auto",
    gridTemplateAreas: `
    'name price'
    'for for'
    'requests requests'
    'unused button'
    `
  },
  itemName: {
    margin: "5px 0",
  },
  price: {
    justifySelf: 'right',
  },
  category: { display: 'none' },
  for: { gridArea: 'for', },
  input: {
    display: 'block',
  },
  requests: { gridArea: 'requests', },
  textarea: { display: 'block', },
  button: { gridArea: 'button', justifySelf: 'right' }
}