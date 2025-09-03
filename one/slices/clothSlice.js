import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all cloths
export const fetchCloths = createAsyncThunk(
  "cloths/fetchCloths",
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(`http://localhost:5000/api/cloths`, {
      params: { page, limit },
    });
    return response.data; // includes cloths, totalPages, currentPage
  }
);



const clothSlice = createSlice({
  name: "cloths",
  initialState: {
    cloths: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder;
    builder
      .addCase(fetchCloths.fulfilled, (state, action) => {
        state.cloths = action.payload.cloths;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
  },
});

export default clothSlice.reducer;
