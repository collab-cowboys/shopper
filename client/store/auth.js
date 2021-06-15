import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */

export const me = createAsyncThunk("auth/me", async () => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const res = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
});

//  export const authenticate =
//   (username, password, method) => async (dispatch) => {
//     try {
//       const res = await axios.post(`/auth/${method}`, { username, password });
//       window.localStorage.setItem(TOKEN, res.data.token);
//       dispatch(me());
//     } catch (authError) {
//       return dispatch(setAuth({ error: authError }));
//     }
//   };

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (arg, thunkAPI) => {
    const {username, password, formName: method} = arg;
    const {dispatch} = thunkAPI;
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      console.log("Res.data", res.data)
      window.localStorage.setItem(TOKEN, res.data.token);
      //console.log("Me", me())
      dispatch(me());
    } catch (authError) {
      return { error: authError };
    }
  }
);

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
// export default function (state = {}, action) {
//   switch (action.type) {
//     case SET_AUTH:
//       return action.auth;
//     default:
//       return state;
//   }
// }

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    auth: (state, action) => {
      state = action.auth;
    },
  },
  extraReducers: {
    [me.fulfilled]: (state, action) => {
      console.log("MeRan")
      state = action.payload;
      return state;
    },
    // [authenticate.fulfilled] : (state, action) => {
    //    state = action.payload;
    // }
  },
});

export const { auth } = authSlice.actions;
export default authSlice.reducer;
