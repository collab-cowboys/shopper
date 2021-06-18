import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import allProducts from "./allProducts";
import singleProduct from "./singleProduct";
import cart from "./cart";

export default configureStore({
  reducer: { auth, singleProduct, allProducts, cart },
  middleware: [thunkMiddleware, createLogger({ collapsed: true })],
  devTools: true,
});
export * from "./auth";
