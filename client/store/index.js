import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import allProducts from './allProducts';

export default configureStore({
  reducer: { auth, allProducts },
  middleware: [thunkMiddleware, createLogger({ collapsed: true })],
  devTools: true,
});
export * from './auth';
