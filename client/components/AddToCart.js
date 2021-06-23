import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../store/cart";

const AddToCart = (props) => {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth).id !== undefined;

  return (
    <div>
      <button type="button" onClick={() => dispatch(addItemToCart({cart, product, quantity, isLoggedIn}))}>
        Add To Cart
      </button>
      <input
        type="number"
        value={quantity}
        min="1"
        max="10"
        onChange={(evt) => setQuantity(evt.target.value)}
      />
    </div>
  );
};

export default AddToCart;
