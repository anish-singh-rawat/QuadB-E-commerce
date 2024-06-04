import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import productsSlice from "./slices/productsSlice";
import loginSlice from "./slices/loginSlice";
import registerSlice from "./slices/registerSlice";
import CartSlice from "./slices/CartSlice";
const store = configureStore({
  reducer: {
    products:productsSlice,
    login:loginSlice,
    register:registerSlice,
    cart : CartSlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk),
});

export default store;
