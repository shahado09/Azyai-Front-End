import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as profileService from "../../services/profile";
import './ProfileShow.css'

const ProfileShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    profileService
      .show(id)
      .then(setProfile)
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setError("Unable to load profile.");
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await profileService.deleteOne(id);
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Unable to delete profile.");
    }
  };

  if (error) return <h1 style={{ color: "crimson" }}>{error}</h1>;
  if (!profile) return <h1>Loading...</h1>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="avatar-wrapper">
            <img src={profile.avatar} alt="Profile avatar" className="avatar" />
          </div>
          <button onClick={() => navigate('/dashboard')} className="sidebar-btn edit">Dashboard</button>
          <button onClick={() => navigate('/dashboard')} className="sidebar-btn edit">Vender Request</button>
          <Link to={`/profile/${id}/edit`} className="sidebar-btn edit">Edit Profile</Link>
          <button onClick={handleDelete} className="sidebar-btn delete">Delete Profile</button>
        </div>

        {/* Content */}
        <div className="profile-content">
          <h2>Profile Information</h2>
          <div className="info-grid">
            <div>
              <label>Phone</label>
              <input type="text" value={profile.phone} disabled />
            </div>
            <div>
              <label>Address</label>
              <input type="text" value={profile.address} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShow;
