import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as profileService from "../../services/profile";

function ProfileShow() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const data = await profileService.show(id, token);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const deleted = await profileService.deleteOne(id, token);
      if (deleted) {
        navigate("/");
      } else {
        console.log("Something went wrong while deleting profile!");
      }
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (!profile) return <h1>Profile not found</h1>;

  return (
    <div className="profile-show">
      <h1>{profile.username}</h1>
      <h4>{profile.email}</h4>
      <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
      <p><strong>Address:</strong> {profile.address || "N/A"}</p>

      <div>
        <Link to={`/profile/${id}/edit`} className="btn-edit">
          Edit Profile
        </Link>
        <br />
        <button onClick={handleDelete} className="btn-delete">
          Delete Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileShow;
