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

  if (!id) return <h1>Loading...</h1>;
  if (!cloth) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>{cloth.name}</h1>
      <p>{cloth.description}</p>
      <p>Category: {cloth.category}</p>
      <p>Price: {cloth.price}</p>

      {cloth.salePrice && <p>Sale Price: {cloth.salePrice}</p>}

      <p>Stock: {cloth.stockQty}</p>
      <p>Available: {cloth.isAvailable ? "Yes" : "No"}</p>

      <p>Sizes: {Array.isArray(cloth.sizes) ? cloth.sizes.join(", ") : ""}</p>

      <div>
        <Link to={`/cloth/${id}/edit`}>Edit</Link>
        <br />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ClothDetail;