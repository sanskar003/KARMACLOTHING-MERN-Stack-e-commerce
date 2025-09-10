import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "@/config/api";

// Thunk to update address
export const updateAddress = createAsyncThunk(
  "auth/updateAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/personal-info/address`,
        { address: addressData },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return res.data.address;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

const initialState = {
  token: Cookies.get("token") || "",
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set("token", action.payload.token, { expires: 1 });
      Cookies.set("user", JSON.stringify(action.payload.user), { expires: 1 });
    },
    loginFailure(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.token = "";
      state.user = null;
      Cookies.remove("token");
      Cookies.remove("user");
    },
    registerSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set("token", action.payload.token, { expires: 1 });
      Cookies.set("user", JSON.stringify(action.payload.user), { expires: 1 });
    },
    registerFailure(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.user) {
          state.user.address = action.payload;
          Cookies.set("user", JSON.stringify(state.user), { expires: 1 });
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
