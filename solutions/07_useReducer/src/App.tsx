import { lazy, createContext, Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Menu } from './components/Menu.tsx';
import { Cart } from './components/Cart.tsx';
import { NotFound } from './components/NotFound.tsx';
import { Order } from './components/Order.tsx';
//import { Orders } from './components/Orders.tsx';
import { Login } from './components/Login.tsx';
import { Register } from './components/Register.tsx';
import './site.css';
import { getNextCartItemId } from './data/utilities.ts';
import { MenuItem } from './types/MenuItem.ts';
import { CartItem } from './types/CartItem.ts';
import { User } from './types/User.ts';
import { Loading } from './components/Loading.tsx';
import { NavBar } from './components/NavBar.tsx';

const Orders = lazy(() => import('./components/Orders.tsx'));
export const UserContext = createContext<User | undefined>(undefined);

export function App() {
  const [user, setUser] = useState<User | undefined>();
  const [cart, setCart] = useState<Array<CartItem>>([]);

  return (
    <UserContext.Provider value={user}>
      <header id="pageHeader">
        <Toaster position="top-right" reverseOrder={true} />
        <NavBar user={user} setUser={setUser} />
      </header>
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Menu addToCart={addToCart} />} />
            <Route path="/menu" element={<Navigate to="/" replace={true} />} />
            <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} changeCartItem={changeCartItem} />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orders/:orderId' element={<Order />} />
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/register' element={<Register setUser={setUser} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </UserContext.Provider>
  );
  function addToCart(menuItem: MenuItem) {
    const cartItem: CartItem = {
      ...menuItem,
      category: menuItem.category ?? "",
      imageURL: menuItem.imageURL ?? "",
      name: menuItem.name ?? "",
      price: menuItem.price ?? 0,
      itemId: menuItem.id ?? 0,
      id: getNextCartItemId(cart),
    };
    setCart([...cart, cartItem]);
    toast.success(`${menuItem.name} put in your cart`)
  }
  function removeFromCart(cartItem: CartItem) {
    setCart(cart.filter(oi => oi !== cartItem));
    toast.success(`${cartItem.name} removed`)
  }
  function changeCartItem(newCartItem: CartItem) {
    const newCart = cart.map(ci => ci.id === newCartItem.id ? newCartItem : ci);
    setCart(newCart);
  }
}

