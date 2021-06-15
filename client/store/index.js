import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';

// const reducer = combineReducers({ auth });
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
// );
// const store = createStore(reducer, middleware);

export default configureStore({
  reducer: { auth },
  middleware: [thunkMiddleware, createLogger({ collapsed: true })],
  devTools: true,
});
export * from './auth';
