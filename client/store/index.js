import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import allProducts from './allProducts';
import singleProduct from './singleProduct';
import cart from './cart';
import userOrder from './order';

export default configureStore({
  reducer: { auth, singleProduct, allProducts, cart, userOrder },
  middleware: [thunkMiddleware, createLogger({ collapsed: true })],
  devTools: true,
});
export * from './auth';
