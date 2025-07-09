import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../env";

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (_, thunkAPI) => {
    try {
      let response = await axios.get(`${server}/api/v1/product`);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getProductById=createAsyncThunk( "product/getProductById",async(id,thunkAPI)=>{
  try {
    let response=await axios.get(`${server}/api/v1/product/${id}`,{withCredentials: true})
    
     return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    
  }
})

export const updateProductData = createAsyncThunk(
  "product/updateProductData",
  async ({ id, product }, thunkAPI) => {
    try {
      const response = await axios.put(`${server}/api/v1/product/update/${id}`, {
        ...product,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong!" }
      );
    }
  }
);

export const deleteProduct=createAsyncThunk("product/delete",async({id},thunkAPI)=>{

  try {
     const response = await axios.delete(`${server}/api/v1/product/delete/${id}`,{ withCredentials: true,})
    
      return response.data;
    
  } catch (error) {
     return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong!" }
      );
  }
})


const initialState = {
  product: [], 
  loading: false, 
  error: false, 
  message: "", 
  productFetched: false, 
  comment: [], 
  productId:{},
  newProduct: {
    userId: "", 
    title: "",
    description: "",
    price: 0,
    qty: 0,
    category: "clothing", 
    image: {
      filename: "",
      url: "uploads/default.jpg",
    },
  },
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.productFetched = false;
        state.message = "Fetching products...";
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.productFetched = true;
        state.product = action.payload.product;
        state.message = action.payload.message;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.productFetched = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch products";
      })
      .addCase(getProductById.pending,(state)=>{
        state.loading = true;
        state.error = false;
        state.productFetched = false;
        state.message = "Fetching products...";
      })
      .addCase(getProductById.fulfilled,(state,action)=>{
       state.loading = false;
        state.error = false;
        state.productFetched = true;
        state.productId = action.payload.productId;
        state.message = action.payload.message;
      })
      .addCase(getProductById.rejected,(state,action)=>{
       state.loading = false;
        state.error = true;
        state.productFetched =false;
        state.message = action.payload.message;
      })
       .addCase(updateProductData.pending,(state)=>{
        state.loading = true;
        state.error = false;
        state.productFetched = false;
        state.message = " products updating...";
      })
      .addCase(updateProductData.fulfilled,(state,action)=>{
       state.loading = false;
        state.error = false;
        state.productFetched = true;
        state.product = action.payload.product;
        state.message = action.payload.message|| "Product updated successfully!";
      })
       .addCase(updateProductData.rejected,(state,action)=>{
       state.loading = false;
        state.error = true;
        state.productFetched =false;
        state.message = action.payload.message || "Failed to update product.";
      })
      .addCase(deleteProduct.pending,(state)=>{
        state.loading = true;
        state.error = false;
        state.productFetched = false;
        state.message = " products updating...";
      })
      .addCase(deleteProduct.fulfilled,(state,action)=>{
       state.loading = false;
        state.error = false;
        state.product = action.payload.deleteProduct;
        state.message = action.payload.message|| "Product delete successfully!";
      })
      .addCase(deleteProduct.rejected,(state,action)=>{
       state.loading = false;
        state.error = true;
        state.productFetched =false;
        state.message = action.payload.message || "Failed to update product.";
      })
  },
});

export default ProductSlice.reducer;
