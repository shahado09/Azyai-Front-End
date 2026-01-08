import { useNavigate } from "react-router";
import "./ClothCard.css";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router";

const ClothCard = ({ cloth }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    navigate(`/cloth/${cloth._id}`);
  };
  
  const handleAddToCart = () => {
    addToCart(cloth)
  }

  const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

  const image =
  Array.isArray(cloth.images) && cloth.images.length > 0 ? cloth.images[0] 
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_XJPZaWfGfx3rso1POXsawWUc0L_1XozN3Q&s";


  return (
    <div className="card">
      <img src={image} alt={cloth.name} className="card-img" />

      <div className="card-body">
        <h3 className="card-title">{cloth.name}</h3>

        <div className="card-price">
          {cloth.salePrice ? (
            <>
              <span className="card-old">{cloth.price} BD</span>
              <span>{cloth.salePrice} BD</span>
            </>
          ) : (
            <span>{cloth.price} BD</span>
          )}
        </div>

        {(!cloth.isAvailable || cloth.stockQty <= 0) && (<div className="card-badge">Out of stock</div> )}
        <div>
          <button  onClick={handleClick}>View Cloth</button>
          <button  onClick={handleAddToCart}>Add to Cart</button>
          
        </div>
      </div>
    </div>
  );
};

export default ClothCard;