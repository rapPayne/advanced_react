import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../data/authentication';

export const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1>Login</h1>
      <Link to="/register">Register</Link>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" onChange={e => setUsername(e.target.value)} value={username} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" onChange={e => setPassword(e.target.value)} value={password} />
      </div>
      <button onClick={handleLogin}>Log in</button>
    </>
  )

  function handleLogin() {
    login(username, password)
      .then(r => (console.log(r), r))
      .then(user => (setUser(user), user))
      .then(user => toast.success(`Welcome ${user?.first}!`))
      .catch(err => toast.error(`Can't log in. ${err.message}`))
  }
}