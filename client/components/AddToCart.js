import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AddToCart = (props) => {
  const { product, quantity } = props;
  const cart = useSelector((state) => state.cart);
  const handleClick = (product, quantity) => {
    const totalPrice = product.cost * quantity;
    const { name } = product;
    const newCart = JSON.stringify({
      ...cart,
      [product.name]: { product, quantity, totalPrice },
    });

    window.localStorage.setItem('cart', newCart);
    //todo: add logic for logged-in user
  };
  return (
    <button type="button" onClick={() => handleClick(product, quantity)}>
      Add To Cart
    </button>
  );
};

export default AddToCart;
