import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let server = "http://localhost:5000";

axios.defaults.withCredentials = true;

export const Signup=createAsyncThunk("auth/SignUpUser",async({email, password,number},thunkAPI)=>{
  try {
    const response = await axios.post(`${server}/register`,{ email, password,phone:number },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
      return response.data;
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/login`,{ email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.message = "Logged out.";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "Logging in...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message || "Login successful.";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Login failed.";
      })
      .addCase(Signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "Logging in...";
      })
      .addCase(Signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message || "Login successful.";
      })
      .addCase(Signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Login failed.";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;