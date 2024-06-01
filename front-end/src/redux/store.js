import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import productsSlice from "./slices/productsSlice";
import loginSlice from "./slices/loginSlice";
import registerSlice from "./slices/registerSlice";

const store = configureStore({
  reducer: {
    products:productsSlice,
    login:loginSlice,
    register:registerSlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk),
});

export default store;
