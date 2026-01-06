import { useState } from "react";
import { useNavigate } from "react-router";
import * as clothService from "../../services/clothService";

const ClothCreate = () => {
  const navigate = useNavigate();


  const [formState, setFormState] = useState({
    name: "",
    description: "",
    category: "other",
    price: 0,
    salePrice: "",
    stockQty: 0,
    isAvailable: true,
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    const newFormState = {...formState,[name]: type === "checkbox" ? checked : value,};
    setFormState(newFormState);
  };

  const handleSizeChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedSizes((prev) => [...prev, value]);
    } else {
      setSelectedSizes((prev) => prev.filter((selectedSize) => selectedSize !== value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (selectedSizes.length === 0) {
      setErrorMessage("Please select at least one size.");
      return;
    }

    try {
      const payload = { ...formState };
      payload.price = Number(payload.price);
      payload.stockQty = Number(payload.stockQty);

      if (payload.salePrice === "") {
        delete payload.salePrice;
      } else {
        payload.salePrice = Number(payload.salePrice);
      }

      payload.sizes = selectedSizes;
      payload.images = [];
      const createdCloth = await clothService.createCloth(payload);

      if (createdCloth) {
        navigate("/cloth");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Create failed");
    }
  };

  return (
    <div className="clothCreatePage">
      <h1>Create Cloth</h1>

      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={formState.name} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <input id="description" name="description" type="text" value={formState.description} onChange={handleChange} />

        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={formState.category} onChange={handleChange} >
          <option value="abaya">abaya</option>
          <option value="jalabiya">jalabiya</option>
          <option value="dress">dress</option>
          <option value="set">set</option>
          <option value="other">other</option>
        </select>

        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" min={0} value={formState.price} onChange={handleChange}/>

        <label htmlFor="salePrice">Sale Price</label>
        <input id="salePrice" name="salePrice" type="number" min={0} value={formState.salePrice} onChange={handleChange} />

        <label htmlFor="stockQty">Stock Quantity</label>
        <input id="stockQty" name="stockQty" type="number" min={0} value={formState.stockQty} onChange={handleChange} />

        <label>
          <input type="checkbox" name="isAvailable" checked={formState.isAvailable} onChange={handleChange} />
          Available
        </label>

        <h4>Sizes </h4>
        {["XS", "S", "M", "L", "XL", "XXL", "FreeSize"].map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              value={size}
              checked={selectedSizes.includes(size)}
              onChange={handleSizeChange}
            />
            {size}
          </label>

        ))}
        
        <label htmlFor="images">Stock Quantity</label>
        <input id="images" type="file" multiple onChange={handleChange} />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ClothCreate;