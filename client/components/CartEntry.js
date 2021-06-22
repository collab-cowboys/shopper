import React from "react";
import { useDispatch } from "react-redux";
import {changeProductInCartQuantity, deleteCartProducts } from '../store/cart'

const CartEntry = (props) => {
  const dispatch = useDispatch();
  const { name, imageUrl, quantity, totalPrice } = props;
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <span>{name}</span>
        <img
          src={imageUrl}
          style={({ width: "auto" }, { height: 75 + "px" })}
        />
      </td>
      <td>
        <span>{quantity}</span>
        <button type="button" onClick={() => dispatch(changeProductInCartQuantity({name, changeValue: 1}))}>+</button>
        <button type="button" onClick={() => dispatch(changeProductInCartQuantity({name, changeValue: -1}))}>-</button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => dispatch(deleteCartProducts({ name: name }))}
        >
          X
        </button>
      </td>
      <td>
        <span>{totalPrice}</span>
      </td>
    </tr>
  );
};

export default CartEntry;
