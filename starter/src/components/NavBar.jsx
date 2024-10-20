import { Link } from 'react-router-dom';

export const NavBar = ({ user, setUser }) => {
  return (
    <nav>
      <Link to="/">Dinner and a movie</Link>
      <Link to="/register">Register</Link>
      <Link to="/cart">Check out</Link>
      <Link to="/orders">Past orders</Link>
      {user ? null : <Link to="/login">Log in</Link>}
      {user && <Link to="#" onClick={() => setUser(undefined)}>Welcome {user.first} (Log out)</Link>}
    </nav>
  )
}