import React from "react";
import { deleteCartProducts } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";

const CartEntry = (props) => {
  const dispatch = useDispatch();
  const { name, imageUrl, quantity, totalPrice } = props;
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
        <button type="button">+</button>
        <button type="button">-</button>
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
