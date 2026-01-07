import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";

import { getAllCloth } from "../../services/clothService";
import ClothCard from "../../components/ClothCard/ClothCard";

import "./ClothList.css";

function ClothList() {

  // states

  const [allClothes, setAllClothes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");

  const categories = ["all","abaya","jalabiya","dress","set","other",];


// bring the data
  async function getAllClothesFromServer() {
    try {
      setIsLoading(true);
      const data = await getAllCloth(); 
      setAllClothes(data.allCloth);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to load clothes. Please try again.");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getAllClothesFromServer();
  }, []);

// search and filltering
  const fuse = useMemo(() => {
    return new Fuse(allClothes, {
      keys: ["name", "category", "sku"],
      threshold: 0.4,
    });
  }, [allClothes]);

function CategoryFilter(clothesList) {
  if (selectedCategory === "all") return clothesList;
  return clothesList.filter(
    (cloth) => cloth.category === selectedCategory
  );
}

let filteredClothes = CategoryFilter(allClothes);

if (searchText.trim() !== "") {
  const SearchText = searchText.trim().toLowerCase();

  const skuMatches = allClothes.filter((cloth) =>
    (cloth.sku || "").toLowerCase().includes(SearchText)
  );

  const results = skuMatches.length > 0? skuMatches: fuse.search(searchText).map((result) => result.item);
  filteredClothes = CategoryFilter(results);
}




// loading and error message
  if (isLoading) {
    return (
      <div className="cloth-list">
        <p className="message">Loading clothes...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="cloth-list">
        <p className="message error">{errorMessage}</p>
        <button className="retry-button" onClick={getAllClothesFromServer}>
          Try again
        </button>
      </div>
    );
  }
console.log(filteredClothes);


  return (
    <div className="cloth-list">

      <div className="header">
        <h1 className="title">All Clothes</h1>
        <p className="count">{filteredClothes.length} items</p>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name, category, or SKU..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}>
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filteredClothes.length === 0 ? (
        <p className="message">No clothes found.</p>
      ) : (
        <div className="cards-grid">
          {filteredClothes.map((cloth) => (
            <ClothCard key={cloth._id} cloth={cloth} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ClothList;