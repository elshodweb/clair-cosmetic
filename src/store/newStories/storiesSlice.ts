// src/store/news/newsSlice.ts
import instance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface NewsState {
  news: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  status: "idle",
  error: null,
};

export const getNews = createAsyncThunk("news/getNews", async () => {
  const response = await instance.get(
    "/news/?category_slugs=storisy",
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  return response.data.results;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;
