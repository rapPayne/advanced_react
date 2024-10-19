import { useEffect, ReactElement, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login as loginToServer } from '../data/authentication.ts';
import { User } from '../types/User.ts';

interface Props {
  setUser: (user: User) => void
}
export const Login = ({ setUser }: Props): ReactElement => {
  const id = useId();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const timer = setInterval(() => console.log(`E ${Math.random()}`), 2000);
  useEffect(() => () => clearInterval(timer))
  return (
    <>
      <h1>Login</h1>
      <Link to="/register">Register</Link>
      <div>
        <label htmlFor={`username${id}`}>Username</label>
        <input id={`username${id}`} onChange={e => setUsername(e.target.value)} value={username} />
      </div>
      <div>
        <label htmlFor={`password${id}`}>Password</label>
        <input id={`password${id}`} onChange={e => setPassword(e.target.value)} value={password} />
      </div>
      <button onClick={login}>Log in</button>
    </>
  )

  function login(): void {
    loginToServer(username, password)
      .then(r => (console.log(r), r))
      .then(user => setUser(user))
      .then(() => navigate('/cart'))
      .catch(err => toast.error(`Can't log in. ${err.message}`))
  }
}