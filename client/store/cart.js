import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemToCart = createAsyncThunk(
  "cartProducts/get",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { product, quantity, isLoggedIn, userId, orderId } = arg;
    try {
      if (isLoggedIn) {
        const { data } = await axios.get(
          `/api/carts/products?orderId=${orderId}`
        );
        if (data.filter((prod) => prod.id === product.id).length > 0) {
          await axios.put(`/api/carts/${orderId}`, { product, quantity });
        } else {
          await axios.post(`/api/carts/user/${userId}`, { product, quantity });
        }
      } else {
        const tempCart = window.localStorage.getItem("cart");
        if (tempCart) {
          const storageCart = JSON.parse(tempCart);
          let guestCart = { ...storageCart };
          if (!guestCart[product.id]) {
            guestCart[product.id] = 0;
          }
          guestCart[product.id] += parseInt(quantity, 10);
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
        await Promise.all(
          order.map(async (product) => {
            const { name, imageUrl, cost, transaction, id } = product;
            result[id] = {
              id,
              name,
              imageUrl,
              quantity: transaction.quantity,
              totalPrice: transaction.quantity * cost,
            };
          })
        );
        dispatch({ type: "cartProducts/setCartProducts", payload: result });
      } else {
        const cartJson = window.localStorage.getItem("cart");
        let tempCart = {};
        if (cartJson) {
          const parsedJsonCart = JSON.parse(cartJson);
          let cartObj = { ...parsedJsonCart };
          await Promise.all(
            Object.entries(cartObj).map(async ([key, value]) => {
              const { data } = await axios.get(`/api/products/${key}`);
              let { name, imageUrl, cost } = data;
              tempCart[key] = {
                id: key,
                name,
                imageUrl,
                quantity: value,
                totalPrice: value * cost,
              };
            })
          );
          dispatch({ type: "cartProducts/setCartProducts", payload: tempCart });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const changeProductInCartQuantity = createAsyncThunk(
  "cartProducts/update",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { isLoggedIn, orderId, productId, changeValue } = arg;
    try {
      if (isLoggedIn) {
        const { data: fetchedProduct } = await axios.get(
          `/api/products/${productId}`
        );
        await axios.put(`/api/carts/${orderId}`, {
          product: fetchedProduct,
          quantity: changeValue,
        });
      } else {
        const cartJson = window.localStorage.getItem("cart");
        if (cartJson) {
          let cartObj = JSON.parse(cartJson);

          Object.entries(cartObj).forEach(([key, value]) => {
            if (key === productId) {
              cartObj[key] = parseInt(value, 10) + changeValue;
              if (cartObj[key] < 0) cartObj[key] = 0;
            }
          });
          window.localStorage.setItem(
            "cart",
            JSON.stringify({
              ...cartObj,
            })
          );
        }
      }
      await dispatch(getCartProducts({ isLoggedIn, orderId }));
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartProducts = createAsyncThunk(
  "cartProducts/delete",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { isLoggedIn, orderId, productId } = arg;
    try {
      if (isLoggedIn) {
        await axios.delete(`/api/carts/${orderId}?productId=${productId}`);
      } else {
        const cartJson = window.localStorage.getItem("cart");
        if (cartJson) {
          let cartObj = JSON.parse(cartJson);
          let newObj = {};

          Object.entries(cartObj).forEach(([key, value]) => {
            if (key !== productId) {
              newObj[key] = value;
            }
          });
          window.localStorage.setItem(
            "cart",
            JSON.stringify({
              ...newObj,
            })
          );
        }
      }
      await dispatch(getCartProducts({ isLoggedIn, orderId }));
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
