import { useId, useRef, useState, ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { register as registerOnServer } from '../data/authentication';
import { User } from '../types/User';
import './Register.css';
import { AuthContext } from './AuthProvider';

export const Register = (): ReactElement => {
  const { login } = useContext(AuthContext);
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageUrl, setimageUrl] = useState<string>("");
  const [pan, setPan] = useState<string>("");
  const [expiryMonth, setExpiryMonth] = useState<string>("");
  const [expiryYear, setExpiryYear] = useState<string>("");

  return (
    <section className="Register">
      <h1>Register</h1>

      <div>
        <label htmlFor={`username${id}`}>Username</label>
        <input id={`username${id}`} onChange={e => setUsername(e.target.value)} value={username} />
      </div>

      <div>
        <label htmlFor={`password${id}`}>Password</label>
        <input id={`password${id}`} onChange={e => setPassword(e.target.value)} value={password} />
      </div>

      <div>
        <label htmlFor={`first${id}`}>First</label>
        <input id={`first${id}`} onChange={e => setFirst(e.target.value)} value={first} />
      </div>

      <div>
        <label htmlFor={`last${id}`}>Last</label>
        <input id={`last${id}`} onChange={e => setLast(e.target.value)} value={last} />
      </div>

      <div>
        <label htmlFor={`email${id}`}>Email</label>
        <input id={`email${id}`} onChange={e => setEmail(e.target.value)} value={email} />
      </div>

      <div>
        <label htmlFor={`phone${id}`}>Phone</label>
        <input id={`phone${id}`} onChange={e => setPhone(e.target.value)} value={phone} />
      </div>

      <div>
        <label htmlFor={`imageUrl${id}`}>imageUrl</label>
        <input id={`imageUrl${id}`} onChange={e => setimageUrl(e.target.value)} value={imageUrl} />
      </div>

      <div>
        <label htmlFor={`PAN${id}`}>PAN</label>
        <input id={`PAN${id}`} onChange={e => setPan(e.target.value)} value={pan} />
      </div>

      <div>
        <label htmlFor={`expiryMonth${id}`}>Expiry Month</label>
        <input id={`expiryMonth${id}`} onChange={e => setExpiryMonth(e.target.value)} value={expiryMonth} />
      </div>

      <div>
        <label htmlFor={`expiryYear${id}`}>Expiry Year</label>
        <input id={`expiryYear${id}`} onChange={e => setExpiryYear(e.target.value)} value={expiryYear} />
      </div>

      <button onClick={register}>Register</button>
      <Link to="/login">Login</Link>

      <dialog ref={dialogRef}>
        <p>
          Thanks for joining us, {first}! We hope you're hungry.
        </p>
        <p>
          Your account is ready to be used. Go to <Link to="/">the menu</Link>
          and pick out what you want to eat. Add the dishes to your <Link to="/cart">
            cart</Link>, then checkout. Your server will bring it to you at your
          table while you enjoy the movie.
        </p>
        <p>
          There's a button on your table. Press it if you ever need anything.
          Our servers will be keeping an eye out for that little red light.
        </p>
        <p>Also, you can always order food to go, both for delivery and pick up.</p>
        <p>We're honored that you're choosing to hang out at our place
          and we hope you make a habit of it! Thank you!</p>
        <button onClick={_ => dialogRef.current?.close()}>
          Close
        </button>
      </dialog>

    </section>
  )

  function register() {
    const user: User = { username, password, first, last, phone, email, imageUrl, creditCard: { pan, expiryMonth: +expiryMonth, expiryYear: +expiryYear } }
    registerOnServer(user)
      .then(() => toast.success(`New user was created`))
      .then(() => login(username, password))
      .then(() => dialogRef.current?.showModal())
      .catch(err => toast.error(`Can't log in. ${err.message}`))
  }
}