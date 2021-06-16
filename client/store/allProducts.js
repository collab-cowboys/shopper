import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadAllProducts = createAsyncThunk(
  "allProducts/load",
  async () => {
    try {
      const response = await axios.get("/api/products");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const allProductSlice = createSlice({
  name: "allProducts",
  initialState: [],
  reducers: {
    setAllProducts: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [load.fufilled]: (state, action) => {
      return action.payload;
    },
  },
});
export const { setAllProducts } = allProductSlice.actions;
export default allProductSlice.reducer;
