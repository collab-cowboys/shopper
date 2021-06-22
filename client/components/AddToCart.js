import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartProducts } from '../store/cart';

const AddToCart = (props) => {
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

    window.localStorage.setItem('cart', newCart);
    dispatch(getCartProducts());
    //todo: add logic for logged-in user
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
    </div>
  );
};

export default AddToCart;
