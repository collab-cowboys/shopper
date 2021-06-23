import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartProducts } from "../store/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCart = (props) => {
  const notify = () =>
    toast.success("Added To Cart!!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleClick = (product, quantity) => {
    const totalPrice = product.cost * quantity;
    const newCart = JSON.stringify({
      ...cart,
      [product.name]: { product, quantity, totalPrice },
    });

    window.localStorage.setItem("cart", newCart);
    dispatch(getCartProducts());
    //todo: add logic for logged-in user
    notify();
  };
  const handleChange = (evt) => {};
  return (
    <div>
      <button type="button" onClick={() => handleClick(product, quantity)}>
        Add To Cart
      </button>
      <input
        type="number"
        value={quantity}
        min="1"
        max="10"
        onChange={(evt) => setQuantity(evt.target.value)}
      />
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddToCart;
