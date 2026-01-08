import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as profileService from "../../services/profile";

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
    <main>
      <h1>Edit Profile</h1>
      {loading ? <p>Loading...</p> : null}
      {message && <p style={{ color: "crimson" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone:</label><br />
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Address:</label><br />
          <input name="address" value={form.address} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Avatar URL:</label><br />
          <input name="avatar" value={form.avatar} onChange={handleChange} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </main>
  );
};

export default ProfileEdit;
