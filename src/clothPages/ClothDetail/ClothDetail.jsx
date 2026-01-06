import { useState, useEffect } from "react";
import * as clothService from "../../services/clothService";
import { Link, useParams, useNavigate } from "react-router";

function ClothDetail(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cloth, setCloth] = useState(null);

  useEffect(() => {
    const getOneCloth = async (clothId) => {
      const clothFromServer = await clothService.show(clothId);
      setCloth(clothFromServer);
    };

    if (id) getOneCloth(id);
  }, [id]);

  const handleDelete = async () => {
    const deletedCloth = await clothService.deleteOne(id);

    if (deletedCloth) {
      navigate("/cloth");
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
          <span className="clothDetailLabel">Category:</span>
          <span className="clothDetailValue">{cloth.category}</span>
        </p>

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
          <span className="clothDetailLabel">Sizes:</span>
          <span className="clothDetailValue">
            {Array.isArray(cloth.sizes) ? cloth.sizes.join(", ") : ""}
          </span>
        </p>
      </div>

      <div className="clothDetailActions">
        <Link className="clothDetailEditLink" to={`/cloth/${id}/edit`}>
          Edit
        </Link>

        <button className="clothDetailDeleteButton" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ClothDetail;