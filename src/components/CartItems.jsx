import React, { useContext, useEffect, useState } from "react";
import "./styles/cartItems_style.css";
import { DashCircleFill, PlusCircleFill } from "react-bootstrap-icons";
import { CartItemsChange } from "./HOC/CartItemsChange";
import { loginContext } from "./Context";

const CartItems = ({ addCart }) => {
  const { setAddCart, products } = useContext(loginContext);

  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = (id, state) => {
    const product = products[id];
    // console.log(JSON.stringify(product));
    const updatedCart = CartItemsChange(id, state, addCart, product);
    // console.log(JSON.stringify(updatedCart));
    setAddCart(updatedCart);
  };

  useEffect(() => {
    let totalAmount = 0;

    products.forEach((product) => {
      if (product["id"] in addCart && addCart[product["id"]] > 0) {
        let eachItemAmount = addCart[product["id"]] * product["price"];
        totalAmount = totalAmount + eachItemAmount;
        // setTotalPrice((prevTotal) => prevTotal + eachItemAmount);
      }
    });
    setTotalPrice(totalAmount);
  }, [products, addCart]);

  return (
    <div className="cart-items-main">
      <div className="cart-items-heading">
        <span>Cart items</span>
        <span>Price</span>
      </div>
      <div className="cart-items-box">
        {products.map((product) => {
          // -------------------------------------
          if (product["id"] in addCart && addCart[product["id"]] > 0) {
            return (
              <div className="cart-items-list" key={product["id"]}>
                <div className="cart-items-list-img">
                  <img src={product["images"][0]} alt="img" />
                </div>
                <div className="cart-items-list-desc">
                  <div className="fw-bold">{product["title"]}</div>
                  <div className="d-flex gap-1 justify-content-start align-items-center">
                    Qty :{" "}
                    <DashCircleFill
                      size={18}
                      onClick={() => addItem(product["id"], "minus")}
                      style={{cursor:"pointer"}}
                    />
                    {/* <span>25</span> */}
                    <span>{addCart[product["id"]]}</span>
                    <PlusCircleFill
                      size={18}
                      onClick={() => addItem(product["id"], "plus")}
                      style={{cursor:"pointer"}}
                    />
                  </div>
                </div>
                <div className="cart-items-list-price">
                  <span>${addCart[product["id"]] * product["price"]}</span>
                </div>
              </div>
            );
            // ----------------------------------------------------------
          } else {
            return "";
          }
        })}

        {totalPrice !== 0 && (
          <div className="cart-items-total">
            <span>Total Amount : ${totalPrice}</span>
            <span><span className="cart-items-total-proceed">Proceed</span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItems;
