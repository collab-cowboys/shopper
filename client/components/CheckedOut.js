import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkoutOrder } from '../store/order';

const CheckedOut = () => {
  const notify = () =>
    toast.dark('⭐Purchase was a Success!⭐', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    notify();
  }, []);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const userId = useSelector((state) => state.auth.id);
  const userOrder = useSelector((state) => state.userOrder);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(checkoutOrder({ oldOrderId: userOrder, userId }));
    } else {
      window.localStorage.setItem('cart', '{}');
    }
  }, []);

  return (
    <div>
      Succesful Checkout! Thanks for shopping with us! Come back soon!
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

export default CheckedOut;
