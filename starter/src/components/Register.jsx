import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { register as registerOnServer } from '../data/authentication';


export const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [pan, setPan] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");

  return (
    <>
      <h1>Register</h1>

      <div>
        <label htmlFor={`username`}>Username</label>
        <input id={`username`} onChange={e => setUsername(e.target.value)} value={username} />
      </div>

      <div>
        <label htmlFor={`password`}>Password</label>
        <input id={`password`} onChange={e => setPassword(e.target.value)} value={password} />
      </div>

      <div>
        <label htmlFor={`first`}>First</label>
        <input id={`first`} onChange={e => setFirst(e.target.value)} value={first} />
      </div>

      <div>
        <label htmlFor={`last`}>Last</label>
        <input id={`last`} onChange={e => setLast(e.target.value)} value={last} />
      </div>

      <div>
        <label htmlFor={`email`}>Email</label>
        <input id={`email`} onChange={e => setEmail(e.target.value)} value={email} />
      </div>

      <div>
        <label htmlFor={`phone`}>Phone</label>
        <input id={`phone`} onChange={e => setPhone(e.target.value)} value={phone} />
      </div>

      <div>
        <label htmlFor={`imageUrl`}>imageUrl</label>
        <input id={`imageUrl`} onChange={e => setimageUrl(e.target.value)} value={imageUrl} />
      </div>

      <div>
        <label htmlFor={`PAN`}>PAN</label>
        <input id={`PAN`} onChange={e => setPan(e.target.value)} value={pan} />
      </div>

      <div>
        <label htmlFor={`expiryMonth`}>Expiry Month</label>
        <input id={`expiryMonth`} onChange={e => setExpiryMonth(e.target.value)} value={expiryMonth} />
      </div>

      <div>
        <label htmlFor={`expiryYear`}>Expiry Year</label>
        <input id={`expiryYear`} onChange={e => setExpiryYear(e.target.value)} value={expiryYear} />
      </div>

      <button onClick={register}>Register</button>
      <Link to="/login">Login</Link>
    </>
  )

  function register() {
    const user = { username, password, first, last, phone, email, imageUrl: imageUrl, creditCard: { pan, expiryMonth: +expiryMonth, expiryYear: +expiryYear } }
    registerOnServer(user)
      .then(user => setUser(user))
      .then(() => toast.success(`New user was created`))
      .catch(err => toast.error(`Can't log in. ${err.message}`))
  }
}