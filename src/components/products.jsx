import React, { useContext } from "react";
import { productsContext } from "./Context";
import SingleProduct from "./SingleProduct";
import { SortProductsAlgo } from "./HOC/SortingAlgorithm";

const Products = ({ minPrice, maxPrice, sortType }) => {
  const { products, searchInput } = useContext(productsContext);

  let sortedProducts = [];

  if (sortType) {
    if (sortType === "asce") {
      sortedProducts = SortProductsAlgo(products); //sortALGO
    } else {
      sortedProducts = SortProductsAlgo(products).reverse(); //sortALGO
    }
  } else {
    sortedProducts = [...products];
  }

  // const sortedProducts = SortProductsAlgo(products)
  // console.log(sortedProducts)

  // Conditional mapping of products.
  // if : No price filter applied and no search input, map over all the products
  // else : if : No price filter applied but search input applied, map over search matching products
  // ..... : else : if : Price filter applied no search input, map over products based on price
  // ..... : .... : else : price filter applied and search input applied, map based on both conditions

  return (
    <div className="all-products">
      {sortedProducts.map((product) => {
        if (searchInput === "" && minPrice === null) {
          return <SingleProduct key={product["id"]} product={product} />;
          // ----------------------------------------------------------------
        } else {
          // -------------------------------------
          if (minPrice === null) {
            if (
              product["title"]
                .toLowerCase()
                .startsWith(searchInput.toLowerCase())
            ) {
              return <SingleProduct key={product["id"]} product={product} />;
            } else {
              return "";
            }
            // ---------------------------------
          } else {
            // -----------------
            if (product["price"] >= minPrice && product["price"] <= maxPrice) {
              if (searchInput === "") {
                return <SingleProduct key={product["id"]} product={product} />;
              } else {
                // --------
                if (
                  product["title"]
                    .toLowerCase()
                    .startsWith(searchInput.toLowerCase())
                ) {
                  return (
                    <SingleProduct key={product["id"]} product={product} />
                  );
                } else {
                  return "";
                }
                // --------
              }
              // -----------------
            } else {
              return "";
            }
          }
          // ---------------------------------
        }
        // ----------------------------------------------------------------
      })}
    </div>
  );
};

export default Products;
