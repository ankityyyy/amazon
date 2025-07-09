import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../env";

export const addProductToCart = createAsyncThunk(
  "cart/productAddtocart",
  async ({ id, qty }, thunkAPI) => {
    try {
      let response = await axios.post(`${server}/api/v1/cart/new/${id}`, { qty });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getAllCartProduct = createAsyncThunk(
  "cart/getAllCartProduct",
  async (_, thunkAPI) => {
    try {
      let response = await axios.get(`${server}/api/v1/cart`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (id, thunkAPI) => {
    try {
      let response = await axios.delete(`${server}/api/v1/cart/delete/${id}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (items, thunkAPI) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/order`,
        { items },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Order failed" }
      );
    }
  }
);


export const getAllPlaceOrder = createAsyncThunk(
  "order/getAllPlaceOrder",
  async (_, thunkAPI) => {
    try {
      let response = await axios.get(`${server}/api/v1/order`,);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);


const initialState = {
  item: [],
  order:[],
  loading: false,
  cartFetched: false,
  error: false,
   success: false,
  message: "",
};

console.log()

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "Fetching products...";
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.item = action.payload.cart;
        state.message = action.payload.message;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch products";
      })
      .addCase(getAllCartProduct.pending,(state)=>{
        state.loading = true;
        state.error = false;
        state.message = "Fetching cartProducts...";
      })
      .addCase(getAllCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.item = action.payload.item;
        state.message = action.payload.message;
      })
      .addCase(getAllCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch products";
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
       .addCase(getAllPlaceOrder.pending,(state)=>{
        state.loading = true;
        state.error = false;
        state.message = "Fetching order...";
      })
      .addCase(getAllPlaceOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.order = action.payload.data;
        state.message = action.payload.message;
      })
       .addCase(getAllPlaceOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch order";
      })
      .addCase(deleteProductFromCart.pending,(state)=>{
        state.loading = true;
        state.error = false;
        state.message = "Fetching order...";
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.item=action.payload.data
        state.message = action.payload.message;
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch order";
  })
  },
});

export default cartSlice.reducer;
