import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCartProducts = createAsyncThunk(
  "cartProducts/get",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      //const response = window.localStorage.getItem();
      console.log("window.localStorage", window.localStorage.getItem(1));
      dispatch(response);
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cartProducts",
  initialState: [],
  reducers: {
    setCartProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;
