import React, { useContext, useEffect, useState } from "react";
import "./styles/singleproduct_style.css";
import { Button, Carousel } from "react-bootstrap";
import {
  CartCheckFill,
  CartFill,
  DashCircleFill,
  PlusCircleFill,
  StarFill,
} from "react-bootstrap-icons";
import { productsContext } from "./Context";
import { CartItemsChange } from "./HOC/CartItemsChange";

// const products = {
//     "id": 1,
//     "title": "iPhone 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "thumbnail": "...",
//     "images": [
//       "https://i.dummyjson.com/data/products/1/1.jpg",
//       "https://i.dummyjson.com/data/products/1/2.jpg",
//       "https://i.dummyjson.com/data/products/1/3.jpg",
//       "https://i.dummyjson.com/data/products/1/4.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg"]
//   }

const SingleProduct = ({ product }) => {
  const { addCart, setAddCart } = useContext(productsContext);

  const [leftProducts, setLeftProducts] = useState(null);

  const addItem = (id, state) => {
    const updatedCart = CartItemsChange(id, state, addCart, product)
    
    // console.log(JSON.stringify(updatedCart));

    setAddCart(updatedCart)
  }
  

  useEffect(() => {
    if (product["id"] in addCart) {
      let newcount = product["stock"] - addCart[product["id"]];
      setLeftProducts(newcount);
    } else {
      setLeftProducts(product["stock"]);
    }
  }, [addCart, product]);

  return (
    <div className="product-item-main">
      <div className="product-item-box">
        <div className="product-item-images">
          <Carousel>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="First slide" /> */}
              <div className="carousel-img-container">
                <img src={product["images"][0]} alt="thumbnail" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="Second slide" /> */}
              <div className="carousel-img-container">
                <img src={product["images"][1]} alt="image1" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="Third slide" /> */}
              <div className="carousel-img-container">
                <img src={product["images"][2]} alt="image2" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-img-container">
                <img src={product["images"][3]} alt="image3" />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="product-item-description">
          <div className="product-item-title">
            <span>
              {product["title"]}
            </span>
          </div>
          <div className="product-item-brand">
            <span>
              {"Brand : "}
              {product["brand"]}
            </span>
          </div>
          <div className="product-item-category">
            <span>
              {"Category : "}
              {product["category"]}
            </span>
          </div>
          <div className="product-item-rating-stock">
            <div className="product-item-rating">
              {/* {products["rating"]} */}
              {Math.ceil(product["rating"] * 10) / 10}
              <StarFill />
            </div>
            <div className="product-item-stock">
              {/* //product["stock"] */}
              {leftProducts > 0
                ? `only ${leftProducts} left in stock`
                : `Out of Stock`}
            </div>
          </div>

          <div className="product-item-price">
            <div className="product-item-value">
              ${product["price"]}{" "}
              <span className="product-item-value-original">
                $
                {Math.ceil(
                  product["price"] / (1 - product["discountPercentage"] / 100)
                )}
              </span>
            </div>
            {/* <div className='product-item-value-original'>
                &#8377;{Math.ceil(products["price"] / (1 - products["discountPercentage"] / 100))}
            </div> */}
            <div className="product-item-discount">
              {Math.ceil(product["discountPercentage"] * 10) / 10}% off
            </div>
          </div>

          <div className="product-item-cart">
            {!(product["id"] in addCart) || addCart[product["id"]] <= 0 ? (
              <Button
                variant="success"
                onClick={() => addItem(product["id"], "plus")}
                style={{cursor:"pointer"}}
              >
                Add to Cart{" "}
                <span>
                  <CartFill size={22} />
                </span>
              </Button>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Button
                    variant="warning"
                    // onClick={() => addItem(product["id"], "plus")}
                    style={{cursor:"default"}}
                    className="px-1 me-2"
                  >
                    Added to Cart{" "}
                    <span>
                      <CartCheckFill size={22} />
                    </span>
                  </Button>
                </div>
                <div className="d-flex gap-1 justify-content-evenly align-items-center">
                  Qty :{" "}
                  <DashCircleFill
                    size={18}
                    onClick={() => addItem(product["id"], "minus")}
                    style={{cursor:"pointer"}}
                  />
                  <span>{addCart[product["id"]]}</span>
                  <PlusCircleFill
                    size={18}
                    onClick={() => addItem(product["id"], "plus")}
                    style={{cursor:"pointer"}}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;


  // const addItem = (id, state) => {
  //   setAddCart((prevCart) => {
  //     let total_product_count;

  //     if (id in prevCart) {
  //       if (state === "plus") {
  //         if (product["stock"] > prevCart[id]) {
  //           total_product_count = prevCart[id] + 1;
  //         } else {
  //           total_product_count = prevCart[id];
  //         }
  //       } else if (state === "minus") {
  //         total_product_count = prevCart[id] - 1;
  //       }
  //     } else {
  //       total_product_count = 1;
  //     }

  //     const updatedCart = {
  //       ...prevCart,
  //       [id]: total_product_count,
  //     };

  //     // console.log(JSON.stringify(updatedCart));

  //     return updatedCart;
  //   });
  // };