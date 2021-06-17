import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCartProducts = createAsyncThunk(
  "cartProducts/get",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await axios.get("/api/carts");
      console.log("!!!", response.data);
      dispatch({ type: "cartProducts/get", payload: response.data });
    } catch (error) {
      console.log(error);
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
  // extraReducers: {
  //   [getCartProducts.fulfilled]: (state, action) => {
  //     return action.payload;
  //   },
  // },
});

export const { setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;
