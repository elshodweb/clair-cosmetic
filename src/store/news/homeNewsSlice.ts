// src/store/news/newsSlice.ts

import instance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface newsState {
  news: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalPages: number;
}


// Начальное состояние
const initialState: newsState = {
  news: [],
  status: "idle",
  error: null,
  totalPages: 0,
};

// Асинхронный thunk для получения `news`
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async () => {
    let url = `/news/?category_slugs=main_header&page=1&page_size=3`;
    const response = await instance.get(url);
    return response.data;
  }
);

// Slice
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload.results;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;
