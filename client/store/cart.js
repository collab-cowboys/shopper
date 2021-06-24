import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemToCart = createAsyncThunk(
  "cartProducts/get",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { product, quantity, isLoggedIn, userId } = arg;
    try {
      if (isLoggedIn) {
        await axios.post(`/api/carts/user/${userId}`, { product, quantity });
      } else {
        const tempCart = window.localStorage.getItem("cart");
        if (tempCart) {
          const storageCart = JSON.parse(tempCart);
          let guestCart = { ...storageCart };
          guestCart[product.id] = parseInt(quantity);
          const newCart = JSON.stringify(guestCart);
          window.localStorage.setItem("cart", newCart);
          dispatch({
            type: "cartProducts/setCartProducts",
            payload: guestCart,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCartProducts = createAsyncThunk(
  "cartProducts/get",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { isLoggedIn, orderId } = arg;
    try {
      let result = {};
      if (isLoggedIn) {
        const { data: order } = await axios.get(
          `/api/carts/products/?orderId=${orderId}`
        );
        order.forEach((product) => {
          const { name, imageUrl, cost, transaction } = product;
          result[product.id] = {
            name,
            imageUrl,
            quantity: transaction.quantity,
            totalPrice: transaction.quantity * cost,
          };
        });
      } else {
        const cartJson = window.localStorage.getItem("cart");
        if (cartJson) {
          const parsedJsonCart = JSON.parse(cartJson);
          let cartObj = { ...parsedJsonCart };
          Object.entries(cartObj).forEach(async ([key, value]) => {
            const { data } = await axios.get(`/api/products/${key}`);
            const { name, imageUrl, cost } = data;
            result[key] = {
              name,
              imageUrl,
              quantity: value,
              totalPrice: value * cost,
            };
          });
        }
      }
      dispatch({ type: "cartProducts/setCartProducts", payload: result });
    } catch (error) {
      console.log(error);
    }
  }
);

export const changeProductInCartQuantity = createAsyncThunk(
  "cartProducts/update",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { name, changeValue } = arg;
    try {
      const cartJson = window.localStorage.getItem("cart");
      if (cartJson) {
        const cartObj = JSON.parse(cartJson);
        //loop through obj find by name(key), quantity += changeValue
        Object.entries(cartObj).forEach(([key, value]) => {
          if (key === name) {
            value.quantity = parseInt(value.quantity, 10) + changeValue;
            value.totalPrice = value.quantity * value.product.cost;
          }
        });
        window.localStorage.setItem(
          "cart",
          JSON.stringify({
            ...cartObj,
          })
        );
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
