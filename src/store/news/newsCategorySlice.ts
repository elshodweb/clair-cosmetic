// store/newsSlice.ts
import instance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
interface NewsCategory {
  id: string;
  title: string;
}

interface NewsState {
  categories: NewsCategory[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  categories: [],
  status: "idle",
  error: null,
};

// Create async thunk to fetch categories
export const fetchNewsCategories = createAsyncThunk(
  "newsCategory/fetchNewsCategories",
  async () => {
    const response = await instance.get("/news/categories/");
    return response.data;
  }
);

// Create slice
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewsCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload.filter(
          (i: any) => i.slug !== "storisy"
        );
      })
      .addCase(fetchNewsCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default newsSlice.reducer;
