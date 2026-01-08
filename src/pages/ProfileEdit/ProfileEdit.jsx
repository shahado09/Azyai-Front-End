import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as profileService from "../../services/profile";
import './ProfileEdit.css';

const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: "", address: "", avatar: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await profileService.show(id);
        setForm({
          phone: profile.phone || "",
          address: profile.address || "",
          avatar: profile.avatar || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setMessage("Unable to load profile. Please try again.");
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await profileService.update(id, form);
      navigate(`/profile/${updated._id}`);
    } catch (err) {
      console.error("Error in profile update service:", err);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  return (
   <main className="profile-page">
  <div className="profile-container">
    <div className="profile-content">
      <h2>Edit Profile</h2>
      {loading ? <p>Loading...</p> : null}
      {message && <p className="error-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="info-grid">
          <div>
            <label>Phone</label>
            <input
              className="input-field"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Address</label>
            <input
              className="input-field"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Avatar URL</label>
            <input
              className="input-field"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="Save" className="edit-btn" style={{ marginTop: "20px" }}>
          Save
        </button>
      </form>
    </div>
  </div>
</main>

  );
};

export default ProfileEdit;
