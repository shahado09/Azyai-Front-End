import { useContext } from 'react';
import { Routes, Route } from 'react-router';
import {useState} from 'react';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import CartSummary from './components/CartSummary/CartSummary';
import CartItem from './components/CartItem/CartItem';
import Cart from './pages/CartCard.jsx';

import MyOrders from './pages/MyOrders.jsx';
import OrderCard from './components/OrderCard/OrderCard.jsx';

import { UserContext } from './contexts/UserContext';
import ClothList from './clothPages/ClothList/ClothList';
import AddCloth from './clothPages/AddCloth/AddCloth';
import ClothDetail from './clothPages/ClothDetail/ClothDetail';
import ClothEdit from "./clothPages/ClothEdit/ClothEdit";
import { CartContext } from './contexts/CartContext.jsx';
import CheckoutBtn from './components/CheckoutBtn/CheckoutBtn';

const App = () => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, email) that we extract from the token
  const { user } = useContext(UserContext);

  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <>
      <NavBar/>
      <Routes>
        {/* if the user is logged in we have the user object else we have the user set to null */}
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path="/cloth" element={<ClothList />} />
        <Route path="/cloth/new" element={<AddCloth/>} />
        <Route path="/cloth/:id" element={<ClothDetail />} />
        <Route path="/cloth/:id/edit" element={<ClothEdit />} />
        <Route path='/cart' element={<Cart totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
        <Route path='/cart-summary' element={<CartSummary totalPrice={totalPrice} />} />
        <Route path='/checkout-btn' element={<CheckoutBtn />} />
        <Route path='/cart-item' element={<CartItem />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/order-card' element={<OrderCard />} />

      </Routes>
    </>
  );
};

export default App;
