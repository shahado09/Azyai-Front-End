import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as profileService from "../../services/profile";
import { UserContext } from "../../contexts/UserContext";

const ProfileCreate = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    phone: "",
    address: "",
    avatar: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (user.profileId) {
      navigate(`/profile/${user.profileId}`);
      return;
    }

    try {
      const profile = await profileService.create(form);
      if (profile && profile._id) {
        navigate(`/profile/${profile._id}`);
      }
    } catch (err) {
      console.error("Profile save failed:", err.response?.data || err.message);
      setMessage("An error occurred while creating the profile. Please try again.");
    }
  };

  return (
    <main>
      <h1>Complete Your Profile</h1>
      {message && <p style={{ color: "crimson" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone:</label><br />
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Address:</label><br />
          <input name="address" value={form.address} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Avatar URL:</label><br />
          <input name="avatar" value={form.avatar} onChange={handleChange} required />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </main>
  );
};

export default ProfileCreate;
