import { ReactElement, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../data/authentication.ts';
import { User } from '../types/User.ts';

interface Props {
  setUser: (user: User) => void
}
export const Login = ({ setUser }: Props): ReactElement => {
  const id = useId();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <button onClick={handleLogin}>Log in</button>
    </>
  )

  function handleLogin(): void {
    login(username, password)
      .then(r => (console.log(r), r))
      .then(user => (setUser(user), user))
      .then(user => toast.success(`Welcome ${user?.first}!`))
      .catch(err => toast.error(`Can't log in. ${err.message}`))
  }
}