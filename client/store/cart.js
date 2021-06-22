import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCartProducts = createAsyncThunk(
  "cartProducts/get",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const cartJson = window.localStorage.getItem("cart");
      if (cartJson) {
        const cartObj = JSON.parse(cartJson);
        dispatch({ type: "cartProducts/setCartProducts", payload: cartObj });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartProducts = createAsyncThunk(
  "cartProducts/delete",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const cartJson = window.localStorage.getItem("cart");
      const { name } = arg;
      if (cartJson) {
        let cartObj = JSON.parse(cartJson);
        let newObj = {};
        Object.entries(cartObj).forEach(([key, value]) => {
          if (key !== name) {
            newObj[key] = value;
          }
        });
        window.localStorage.setItem(
          "cart",
          JSON.stringify({
            ...newObj,
          })
        );
        dispatch({ type: "cartProducts/setCartProducts", payload: newObj });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const cartSlice = createSlice({
  name: "cartProducts",
  initialState: {},
  reducers: {
    setCartProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;
