import React, { useState } from "react";
import Products from "./products";
import SortProducts from "./SortProducts";

const Home = () => {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortType, setSortType] = useState("")

  return (
    <div className="d-flex justify-content-center flex-column">
      <SortProducts setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setSortType={setSortType}/>
      <Products minPrice={minPrice} maxPrice={maxPrice} sortType={sortType}/>
    </div>
  );
};

export default Home;
