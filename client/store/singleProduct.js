import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * THUNK CREATORS
 */
export const getSingleProduct = createAsyncThunk("api/products/:id", async (id) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

/**
 * REDUCER
 */
const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {
    name: "",
    gender: "",
    age: 0,
    skills: [],
    cost: 0,
    imageUrl: "",
  },
  reducers: {
    // setSingleProduct: (state, action) => {
    //   return action.payload;
    // },
  },
  extraReducers: {
    [getSingleProduct.fulfilled]: (state, action) => {
      return action.payload;
    },
  }
})



export default singleProductSlice.reducer;
