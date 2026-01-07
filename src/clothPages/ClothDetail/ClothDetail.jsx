import { useState, useEffect } from "react";
import * as clothService from "../../services/clothService";
import { Link, useParams, useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";

import "./ClothDetail.css";

function ClothDetail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [cloth, setCloth] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const getOneCloth = async (clothId) => {
      const clothFromServer = await clothService.show(clothId);
      setCloth(clothFromServer);
    };

    if (id) getOneCloth(id);
  }, [id]);

  const canManage = user && (user.role === "vendor" || user.role === "admin");
  const handleDelete = async () => {
      const message = await clothService.deleteOne(id);


      if (message) {
        navigate("/cloth", { replace: true });
      } else {
        console.log("something went wrong!");
      }
  };
  if (!id) return <h1 className="clothDetailLoading">Loading...</h1>;
  if (!cloth) return <h1 className="clothDetailLoading">Loading...</h1>;

return (
  <div className="clothDetailPage">
    <h1 className="clothDetailTitle">{cloth.name}</h1>

    <p className="clothDetailDescription">{cloth.description}</p>

    <div className="clothDetailInfo">
      <p className="clothDetailLine">
        <span className="clothDetailLabel">Price:</span>
        <span className="clothDetailValue">{cloth.price}</span>
      </p>

      {cloth.salePrice && (
        <p className="clothDetailLine">
          <span className="clothDetailLabel">Sale Price:</span>
          <span className="clothDetailValue">{cloth.salePrice}</span>
        </p>
      )}

      <p className="clothDetailLine">
        <span className="clothDetailLabel">Stock:</span>
        <span className="clothDetailValue">{cloth.stockQty}</span>
      </p>

      <p className="clothDetailLine">
        <span className="clothDetailLabel">Available:</span>
        <span className="clothDetailValue">
          {cloth.isAvailable ? "Yes" : "No"}
        </span>
      </p>

        <p className="clothDetailLine">
          <span className="clothDetailLabel">Stock:</span>
          <span className="clothDetailValue">{cloth.stockQty}</span>
        </p>

        <p className="clothDetailLine">
          <span className="clothDetailLabel">Available:</span>
          <span className="clothDetailValue">
            {cloth.isAvailable ? "Yes" : "No"}
          </span>
        </p>

        <p className="clothDetailLine">
          <span className="clothDetailLabel">Sizes:</span>
          <span className="clothDetailValue">
            {Array.isArray(cloth.sizes) ? cloth.sizes.join(", ") : ""}
          </span>
        </p>
      </div>



    {Array.isArray(cloth.images) && cloth.images.length > 0 && (
      <div className="clothDetailImages">
        {cloth.images.map((img, index) => (
          <img
          key={index}
          src={img}
          alt={`${cloth.name}-${index}`}
          className="clothDetailImage"
          />
        ))}
      </div>
    )}


    <div className="clothDetailActions">
  {canManage && (
    <>
      <Link className="clothDetailEditLink" to={`/cloth/${id}/edit`}>
        Edit
      </Link>

      <button className="clothDetailDeleteButton" onClick={handleDelete}>
        Delete
      </button>
    </>
  )}

  <button onClick={() => addToCart(cloth)}>
    Add to Cart
  </button>
</div>
  
        </div>
);

}

export default ClothDetail;