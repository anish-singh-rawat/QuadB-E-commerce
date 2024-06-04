import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productsSlice from "./slices/productsSlice";
import GetProductsSlice from "./slices/getProducts";
import loginSlice from "./slices/loginSlice";
import registerSlice from "./slices/registerSlice";
import CartSlice from "./slices/CartSlice";
import deleteProductSlice from "./slices/deleteProduct"

const store = configureStore({
  reducer: {
    products: productsSlice,
    getProducts: GetProductsSlice,
    login: loginSlice,
    register: registerSlice,
    cart: CartSlice,
    deleteProducts : deleteProductSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;
