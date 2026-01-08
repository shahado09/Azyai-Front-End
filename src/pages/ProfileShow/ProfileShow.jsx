import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as profileService from "../../services/profile";

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
    <div>
      <img src={profile.avatar} alt="Profile avatar" />
      <p>{profile.phone}</p>
      <p>{profile.address}</p>
      <Link to={`/profile/${id}/edit`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      </div>
    </div>
  );
};

export default ProfileShow;
