// src/store/news/newsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import instance from "@/utils/axiosInstance";

interface News {
  id: string;
  title: string;
  preview: string;
  categories: Array<{
    id: string;
    title: string;
    description: string;
    slug: string;
  }>;
  images: string[];
  created_at: string;
}

interface NewsState {
  news: News[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  status: "idle",
  error: null,
};

// Thunk for fetching news data
export const fetchNews = createAsyncThunk<
  News[],
  { categoryIds: string | null; page: number; pageSize: number }
>("news/fetchNews", async ({ categoryIds, page, pageSize }) => {
  let url = `/news/?page=${page}&page_size=${pageSize}`;
  console.log(categoryIds);

  if (categoryIds) {
    url += `&category_ids=${categoryIds}`;
  }
  const response = await instance.get(url);
  console.log(response);

  return response.data.results;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.news;
export const selectNewsStatus = (state: RootState) => state.news.status;
export const selectNewsError = (state: RootState) => state.news.error;
