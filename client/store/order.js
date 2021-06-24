import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const assignOrder = createAsyncThunk('userOrder/assign', async (arg) => {
  const { userId } = arg;
  let { data: userActiveOrder } = await axios.get(`/api/carts/user/${userId}`);
  if (!userActiveOrder) {
    const { data: newOrder } = await axios.post('/api/carts', { userId });
    userActiveOrder = newOrder;
  }
  return userActiveOrder.id;
});

export const checkoutOrder = createAsyncThunk(
  'userOrder/checkout',
  async (arg, thunkAPI) => {
    const { oldOrderId, userId } = arg;
    const { dispatch } = thunkAPI;
    await axios.put(`/api/carts/${oldOrderId}?close=true`);
    dispatch(assignOrder({ userId }));
  }
);

const orderSlice = createSlice({
  name: 'userOrder',
  initialState: 0,
  extraReducers: {
    [assignOrder.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default orderSlice.reducer;
