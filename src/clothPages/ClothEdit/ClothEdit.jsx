import { useEffect, useState } from "react";
import * as clothService from "../../services/clothService";
import { useNavigate, useParams } from "react-router";
import "./ClothEdit.css";

const ClothEdit = () => {
  const [formState, setFormState] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const getOneCloth = async (clothId) => {
      const cloth = await clothService.show(clothId);
      setFormState(cloth);
    };

    if (id) getOneCloth(id);
  }, [id]);


  if (!id) return <h1 className="clothEditLoading">Loading...</h1>;
  if (!formState) return <h1 className="clothEditLoading">Loading...</h1>;


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newFormState = {...formState,[name]: type === "checkbox" ? checked : value,};
    setFormState(newFormState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formState };
    payload.price = Number(payload.price);
    payload.stockQty = Number(payload.stockQty);

    if (payload.salePrice === "") {
      delete payload.salePrice;
    } else if (payload.salePrice !== null) {
      payload.salePrice = Number(payload.salePrice);
    }

    const updatedCloth = await clothService.update(id, payload);

    console.log(updatedCloth)
    if (updatedCloth) {
      navigate(`/cloth`, { replace: true });
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <div className="clothEditPage">
      <h1 className="clothEditTitle">Edit Cloth</h1>

      <form className="clothEditForm" onSubmit={handleSubmit}>
        <label className="clothEditLabel" htmlFor="name">Name</label>
        <input className="clothEditInput" id="name" name="name" type="text" value={formState.name} onChange={handleChange} />

        <label className="clothEditLabel" htmlFor="description">Description</label>
        <input className="clothEditInput" id="description" name="description" type="text" value={formState.description} onChange={handleChange}/>

        <label className="clothEditLabel" htmlFor="category">Category</label>
        <select
          className="clothEditSelect" id="category" name="category" value={formState.category} onChange={handleChange} >
          <option value="abaya">abaya</option>
          <option value="jalabiya">jalabiya</option>
          <option value="dress">dress</option>
          <option value="set">set</option>
          <option value="other">other</option>
        </select>

        <label className="clothEditLabel" htmlFor="price">Price</label>
        <input className="clothEditInput" id="price" name="price" type="number" min={0} value={formState.price} onChange={handleChange} />

        <label className="clothEditLabel" htmlFor="salePrice">Sale Price</label>
        <input className="clothEditInput" id="salePrice" name="salePrice" type="number" min={0} value={formState.salePrice || ""}  onChange={handleChange}/>

        <label className="clothEditLabel" htmlFor="stockQty">Stock Quantity</label>
        <input className="clothEditInput" id="stockQty" name="stockQty" type="number" min={0} value={formState.stockQty} onChange={handleChange} />

        <label className="clothEditCheckboxRow">
          <input type="checkbox" name="isAvailable"checked={formState.isAvailable} onChange={handleChange}/>
          Available
        </label>

        <button className="clothEditButton" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ClothEdit;