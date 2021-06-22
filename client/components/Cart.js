import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartProducts } from '../store/cart';
import CartEntry from './CartEntry';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  const transactions = Object.keys(cart);

  return (
    <div>
      {transactions.length ? (
        <div>
          <table id="cart">
            <tbody>
              <tr>
                <th>Product Info</th>
                <th>Quantity</th>
                <th>Remove?</th>
                <th>Total Price</th>
              </tr>
              {transactions.map((transaction) => {
                const { id, name, imageUrl } = cart[transaction].product;
                return (
                  <CartEntry
                    key={id}
                    name={name}
                    imageUrl={imageUrl}
                    quantity={cart[transaction].quantity}
                    totalPrice={cart[transaction].totalPrice}
                  />
                );
              })}
            </tbody>
          </table>
          <button type="button">Sign Up &amp; Checkout</button>
          <button type="button">Checkout as Guest</button>
        </div>
      ) : (
        <div>
          <p>
            You have no items in your cart! Why not look at some of our{' '}
            <Link to="/products">product options</Link>?
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
