import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as profileService from "../../services/profile";

const ProfileEdit = () => {
  const [formState, setFormState] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getOneProfile = async (id) => {
      try {
        const profile = await profileService.show(id, token);
        setFormState(profile);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) getOneProfile(id);
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (!formState) return <h1>Profile not found</h1>;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const updatedProfile = await profileService.update(id, formState, token);
      if (updatedProfile) {
        navigate(`/profile/${id}`);
      } else {
        console.log("Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formState.username || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email || ""}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formState.phone || ""}
          onChange={handleChange}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formState.address || ""}
          onChange={handleChange}
        />

        <label htmlFor="avatar">Avatar URL</label>
        <input
          type="text"
          name="avatar"
          id="avatar"
          value={formState.avatar || ""}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
