import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../store/cart";
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
  const isLoggedIn = useSelector((state) => state.auth).id !== undefined;

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch(addItemToCart({ cart, product, quantity, isLoggedIn }));
          notify();
        }}
      >
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
