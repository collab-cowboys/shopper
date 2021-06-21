import React from 'react';

const CartEntry = (props) => {
  const { name, imageUrl, quantity, totalPrice } = props;
  return (
    <tr>
      <td>
        <span>{name}</span>
        <img src={imageUrl} />
      </td>
      <td>
        <span>{quantity}</span>
        <button type="button">+</button>
        <button type="button">-</button>
      </td>
      <td>
        <button type="button">X</button>
      </td>
      <td>
        <span>{totalPrice}</span>
      </td>
    </tr>
  );
};

export default CartEntry;
