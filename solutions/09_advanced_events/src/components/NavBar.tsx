import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const NavBar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">Dinner and a movie</Link>
      <Link to="/register">Register</Link>
      <Link to="/cart">Check out</Link>
      <Link to="/orders">Past orders</Link>
      {isAuthenticated ? null : <Link to="/login">Log in</Link>}
      {isAuthenticated && <Link to="#" onClick={() => logout()}>Welcome {user?.first} (Log out)</Link>}
    </nav>
  )
}