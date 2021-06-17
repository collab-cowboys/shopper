import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../store/cart";
const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProducts());
  });

  return <div>CART PLACEHOLDER</div>;
};

export default Cart;
