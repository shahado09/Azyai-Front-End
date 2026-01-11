import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMyClothes } from "../../services/clothService";
import ClothCard from "../../components/ClothCard/ClothCard";
import "./MyClothes.css";

function MyClothes() {
  const navigate = useNavigate();

  const [myClothes, setMyClothes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await getMyClothes();
        setMyClothes(data.myCloth || []);
        setErrorMessage("");
      } catch (err) {
        setErrorMessage("Failed to load your clothes.");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading) return <p className="myclothes-loading">Loading...</p>;
  if (errorMessage) return <p className="myclothes-error">{errorMessage}</p>;

  return (
    <div className="my-page">
      <div className="my-header-row">
        <h2 className="my-title">My Clothes</h2>

        <button className="my-new-btn" onClick={() => navigate("/cloth/new")}>
          + New Cloth
        </button>
      </div>

      <div className="my-grid">
        {myClothes.map((cloth) => (
          <ClothCard key={cloth._id} cloth={cloth} />
        ))}
      </div>
    </div>
  );
}

export default MyClothes;
