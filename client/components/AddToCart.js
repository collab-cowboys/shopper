import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddToCart = (props) => {
  const { product, quantity } = props;
  handleClick = (product, quantity) => {
    const totalPrice = product.cost * quantity;

    const cart = useSelector((state) => state.cart);

    return { product, quantity, totalPrice };
  };
  return (
    <button type="button" onClick={() => handleClick(product, quantity)}>
      Add To Cart
    </button>
  );
};

export default AddToCart;
