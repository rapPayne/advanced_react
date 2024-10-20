import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import { UserContext } from '../App';

interface Props {
  setUser: (user: User | undefined) => void
}
export const NavBar = ({ setUser }: Props) => {
  const user = useContext(UserContext);
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