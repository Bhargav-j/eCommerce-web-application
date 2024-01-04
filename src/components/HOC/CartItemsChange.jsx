export const CartItemsChange = (id, state, prevCart, product) => {   
  //Only product stock is enough for this function to check total count less than stock count
  let total_product_count;

  if (id in prevCart) {
    if (state === "plus") {
      if (product["stock"] > prevCart[id]) {
        total_product_count = prevCart[id] + 1;
      } else {
        total_product_count = prevCart[id];
      }
    } else if (state === "minus") {
      total_product_count = prevCart[id] - 1;
    }
  } else {
    total_product_count = 1;
  }

  const updatedCart = {
    ...prevCart,
    [id]: total_product_count,
  };

  // console.log(JSON.stringify(updatedCart));

  return updatedCart;
};
