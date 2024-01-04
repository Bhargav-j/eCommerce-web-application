import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { loginContext } from "./Context";

const ProtectedRoute = ({ islogin }) => {
  const { setProducts } = useContext(loginContext);

  useEffect(() => {
    if (islogin) {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((res) => {
          setProducts(res["products"])
          // return res;
        })
        // .then((res) => console.log(res["products"]))
        .catch((err) => console.log(err.message))
    }
  }, [islogin, setProducts]);


  // During building
  // useEffect(()=> {
  //   setProducts([
  //     {
  //       "id": 1,
  //       "title": "iPhone 9",
  //       "description": "An apple mobile which is nothing like apple",
  //       "price": 549,
  //       "discountPercentage": 12.96,
  //       "rating": 4.69,
  //       "stock": 94,
  //       "brand": "Apple",
  //       "category": "smartphones",
  //       "thumbnail": "...",
  //       "images": [
  //         "https://i.dummyjson.com/data/products/1/1.jpg",
  //         "https://i.dummyjson.com/data/products/1/2.jpg",
  //         "https://i.dummyjson.com/data/products/1/3.jpg",
  //         "https://i.dummyjson.com/data/products/1/4.jpg",
  //         "https://i.dummyjson.com/data/products/1/thumbnail.jpg"]
  //     }
  //   ])
  // }, [setProducts])

  return islogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
