import { API_URL } from "@/config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCloths = createAsyncThunk(
  "cloths/fetchCloths",
  async ({ page = 1, limit = 30, category, tags, rating, sort }) => {
    const response = await axios.get(`${API_URL}/api/cloths`, {
      params: { page, limit, category, tags, rating, sort },
    });
    return response.data;
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
    filters: {
      category: "",
      tags: "",
      rating: "",
      sort: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { category: "", tags: "", rating: "", sort: "" };
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCloths.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCloths.fulfilled, (state, action) => {
        state.cloths = action.payload.cloths;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(fetchCloths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = clothSlice.actions;
export default clothSlice.reducer;
