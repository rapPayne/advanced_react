import { useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { NotFound } from './components/NotFound';
import { Order } from './components/Order';
import { Orders } from './components/Orders';
import { Login } from './components/Login';
import { Register } from './components/Register';
import './site.css';
import { getNextCartItemId } from './data/utilities';

export function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  return (
    <>
      <header id="pageHeader">
        <Toaster position="top-right" reverseOrder={true} />
        <nav>
          <Link to="/">Dinner and a movie</Link>
          <Link to="/register">Register</Link>
          <Link to="/cart">Check out</Link>
          <Link to="/orders">Past orders</Link>
          {user ? null : <Link to="/login">Log in</Link>}
          {user && <Link to="#" onClick={() => setUser(undefined)}>Welcome {user.first} (Log out)</Link>}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Menu addToCart={addToCart} />} />
          <Route path="/menu" element={<Navigate to="/" replace={true} />} />
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} changeCartItem={changeCartItem} user={user} />} />
          <Route path='/orders' element={<Orders user={user} />} />
          <Route path='/orders/:orderId' element={<Order user={user} />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register setUser={setUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
  function addToCart(menuItem) {
    const cartItem = {
      ...menuItem,
      itemId: menuItem.id,
      id: getNextCartItemId(cart),
    };
    setCart([...cart, cartItem]);
    toast.success(`${menuItem.name} put in your cart`)
  }
  function removeFromCart(cartItem) {
    setCart(cart.filter(oi => oi !== cartItem));
    toast.success(`${cartItem.name} removed`)
  }
  function changeCartItem(newCartItem) {
    const newCart = cart.map(ci => ci.id === newCartItem.id ? newCartItem : ci);
    setCart(newCart);
  }
}

