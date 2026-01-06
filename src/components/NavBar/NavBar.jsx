import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import './NavBar.css'; 

const NavBar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo">AZYAI</Link>
        </div>

        <div className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/chats">Chats</Link>
          <Link to="/about">About</Link>
          <Link to="/terms">Terms and Conditions</Link>
        </div>

        <div className="nav-right">
          <input type="text" placeholder="Search for...⌕" className="nav-search" />
          <Link className="icon-link" to="/wishlist">♡</Link>
          <Link className="icon-link" to="/cart">🛒</Link>

          {user ? (
            <>
              <button onClick={logout} className="auth-link">Sign Out</button>
              <Link to={`/profile/${user._id}`}>
                <img
                  className="profile-img"
                  src="https://th.bing.com/th/id/OIP.vIq_QWTLmuEoct13lW83UwAAAA?w=183&h=183&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
                  alt="profile"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-up" className="auth-link">Sign Up</Link>
              <Link to="/sign-in" className="auth-link">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
