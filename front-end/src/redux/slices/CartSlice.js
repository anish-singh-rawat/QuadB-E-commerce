import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
  data: null,
  status: "idle",
  error: "",
};

export const handleCartAction = createAsyncThunk(
  "cart/handleCartAction",
  async ({ actionType, payload }, { rejectWithValue }) => {
    try {
      let response;
      switch (actionType) {
        case "add":
          response = await axiosInstance.post("cart/AddCartItem", payload);
          break;
        case "remove":
          response = await axiosInstance.delete("cart/deleteCartItem", { data: payload });
          break;
        case "get":
          response = await axiosInstance.get(`cart/getCartItem/${payload.id}`);
          break;
        default:
          throw new Error("Invalid action type");
      }
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else if (err.request) {
        return rejectWithValue({ message: "No response from server" });
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCartAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleCartAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(handleCartAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;



// To add an item to the cart
// dispatch(handleCartAction({ actionType: "add", payload: item }));

// To remove an item from the cart
// dispatch(handleCartAction({ actionType: "remove", payload: { id: itemId } }));

// To get items from the cart
// dispatch(handleCartAction({ actionType: "get", payload: { id: userId } }));

