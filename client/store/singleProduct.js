import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * THUNK CREATORS
 */
export const getSingleProduct = createAsyncThunk("api/products/:id", async (id) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    //dispatch(setSingleProduct(data))
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
  initialState: {},
    name: "",
  reducers: {
    // we will probably require this thunk afterall
    setSingleProduct: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [getSingleProduct.fulfilled]: (state, action) => {
      return action.payload;
    },
  }
})


export const { setSingleProduct } = singleProductSlice.actions;

export default singleProductSlice.reducer;
