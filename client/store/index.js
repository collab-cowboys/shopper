import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import allProducts from './allProducts';
import singleProduct from './singleProduct'

export default configureStore({
  reducer: { auth, singleProduct, allProducts },
  middleware: [thunkMiddleware, createLogger({ collapsed: true })],
  devTools: true,
});
export * from './auth';
