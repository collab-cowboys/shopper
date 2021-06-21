import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts } from '../store/cart';
import CartEntry from './CartEntry';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  return (
    <div>
      <table id="cart">
        <tbody>
          <tr>
            <th>Product Info</th>
            <th>Quantity</th>
            <th>Remove?</th>
            <th>Total Price</th>
          </tr>
          {Object.keys(cart).map((transaction) => {
            const { id, name, imageUrl } = cart[transaction].product;
            return (
              <CartEntry
                id={id}
                name={name}
                imageUrl={imageUrl}
                quantity={cart[transaction].quantity}
                totalPrice={cart[transaction].totalPrice}
              />
            );
          })}
        </tbody>
      </table>
      <button type="button">Login &amp; Checkout</button>
      <button type="button">Checkout as Guest</button>
    </div>
  );
};

export default Cart;
