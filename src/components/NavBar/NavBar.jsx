import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import './NavBar.css'; 

const NavBar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const profileId = localStorage.getItem("profileId");
    if (profileId) {
      navigate(`/profile/${profileId}`);
    } else {
      navigate("/profile/create");
    }
  };

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
              <button onClick={handleProfileClick} className="icon-link">👤</button>
              <button onClick={logout} className="auth-link">Sign Out</button>
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
