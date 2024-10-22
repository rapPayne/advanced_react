import { ReactElement, useContext, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider.tsx';

export const Login = (): ReactElement => {
  const { login } = useContext(AuthContext);
  const id = useId();
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
  }
}