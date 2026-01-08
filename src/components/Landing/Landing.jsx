import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Landing.css";

const Landing = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="page">
      <div className="logo-box">
        <img
          className="logo-img"
          src="/images/logo-banner.png"
          alt="Azyai banner"
        />
      </div>

      <h1 className="home-title">Welcome to Azyai</h1>
      <p className="home-subtitle">
        Discover unique fashion from local designers.
      </p>

      {user && (
        <Link className="vendor-link" to="/vendor/request">
          You Want to be a Vendor?
        </Link>
      )}

      <div className="home-actions">
        <Link to="/cloth" className="All-Clothes-btn">
          View All Clothes
        </Link>

        {user && (user.role === "vendor" || user.role === "admin") && (
          <Link to="/cloth/new" className="add-new-cloth-btn">
            Add New Cloth
          </Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin/vendor-requests" className="review-vendor-requests-btn">
            Review Vendor Requests
          </Link>
        )}
      </div>
    </main>
  );
};

export default Landing;
