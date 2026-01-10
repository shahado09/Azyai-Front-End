import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

import ProfileShow from "./pages/ProfileShow/ProfileShow";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import ProfileCreate from "./pages/ProfileCreate/ProfileCreate";

import { UserContext } from "./contexts/UserContext";
import { useContext } from 'react';
import {useState} from 'react';
import RequireRole from './components/accessControl/RequireRole.jsx';
import VendorRequest from './VendorAndAdminPages/VendorRequests.jsx';
import AdminVendorRequests from './VendorAndAdminPages/AdminVendorRequests.jsx';

import CartSummary from './components/CartSummary/CartSummary';
import CartItem from './components/CartItem/CartItem';
import Cart from './cartpages/CartCard.jsx';

import MyOrders from './cartpages/MyOrders.jsx';
import OrderCard from './components/OrderCard/OrderCard.jsx';

import ClothList from './clothPages/ClothList/ClothList';
import AddCloth from './clothPages/AddCloth/AddCloth';
import ClothDetail from './clothPages/ClothDetail/ClothDetail';
import ClothEdit from "./clothPages/ClothEdit/ClothEdit";
import { CartContext } from './contexts/CartContext.jsx';
import CheckoutBtn from './components/CheckoutBtn/CheckoutBtn';

const App = () => {
  const { user } = useContext(UserContext); // Get user information from UserContext

  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="page">
      <NavBar /> {/* Render navigation bar */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Landing />} /> {/* Redirect based on user status */}
          <Route path="/sign-up" element={<SignUpForm />} /> {/* Sign-up route */}
          <Route path="/sign-in" element={<SignInForm />} /> {/* Sign-in route */}
          <Route
            path="/profile/create"
            element={user ? <ProfileCreate /> : <Navigate to="/sign-in" replace />} // Redirect to sign-in if no user
          />
          <Route
            path="/profile/:id"
            element={user ? <ProfileShow /> : <Navigate to="/sign-in" replace />} // Redirect to sign-in if no user
          />
          <Route
            path="/profile/:id/edit"
            element={user ? <ProfileEdit /> : <Navigate to="/sign-in" replace />} // Redirect to sign-in if no user
          />
          {/* Optional: direct route to current user's profile */}
          {user?.profileId && (
            <Route
              path="/my-profile"
              element={<Navigate to={`/profile/${user.profileId}`} replace />} // Redirect to user's profile
            />
          )}
          <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path="/vendor-request" element={<VendorRequest />}/>
        <Route path="/cloth" element={<ClothList />} />
        <Route path="/cloth/new" element={ <RequireRole allowedRoles={["vendor", "admin"]}> <AddCloth /> </RequireRole>}/>
        <Route path="/cloth/:id/edit" element={ <RequireRole allowedRoles={["vendor", "admin"]}> <ClothEdit /> </RequireRole>}/>
        <Route path="/cloth/:id" element={<ClothDetail />} />
        <Route path='/cart' element={<Cart totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
        <Route path='/cart-summary' element={<CartSummary totalPrice={totalPrice} />} />
        <Route path='/checkout-btn' element={<CheckoutBtn />} />
        <Route path='/cart-item' element={<CartItem />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/order-card' element={<OrderCard />} />
        <Route path="/admin/vendor-requests" element={ <RequireRole allowedRoles={["admin"]}> <AdminVendorRequests /> </RequireRole>}/>
 
        </Routes>
      </div>
    </div>
  );
};

export default App;