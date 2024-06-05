import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
const initialState = {
  posts: [],
  status: "idle",
  error: "",
};

export const placeOderProduct = createAsyncThunk("product/placeOderProduct", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("product/addProductData", payload,{
    });
    return response?.data;
  } catch (err) {
    if (err.response) {
      return rejectWithValue(err.response.data);
    } else if (err.request) {
      return rejectWithValue({ message: "No response from server" });
    } else {
      return rejectWithValue({ message: err.message });
    }
  }

});

const productsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(placeOderProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOderProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(placeOderProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
