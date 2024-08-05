// src/store/news/newsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import instance from "@/utils/axiosInstance";
import { ReactNode } from "react";
import { RootState } from "../store";

interface News {
  id: string;
  title: string;
  preview: string;
  body: ReactNode;
  categories: Array<{
    id: string;
    title: string;
    description: string;
    slug: string;
  }>;
  images: string[];
  created_at: string;
}

interface NewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: News[];
}

interface NewsState {
  news: News[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalCount: number; // Добавляем общее количество новостей
}

const initialState: NewsState = {
  news: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalCount: 0, // Изначально 0
};

// Thunk для получения данных новостей
export const fetchNews = createAsyncThunk<
  NewsResponse,
  { categoryIds: string | null; page: number; pageSize: number }
>("news/fetchNews", async ({ categoryIds, page, pageSize }) => {
  let url = `/news/?page=${page}&page_size=${pageSize}`;

  if (categoryIds) {
    url += `&category_ids=${categoryIds}`;
  }
  const response = await instance.get(url);

  return response.data;
});

// Новый Thunk для загрузки дополнительных новостей
export const fetchMoreNews = createAsyncThunk<
  NewsResponse,
  { categoryIds: string | null; page: number; pageSize: number }
>("news/fetchMoreNews", async ({ categoryIds, page, pageSize }) => {
  let url = `/news/?page=${page}&page_size=${pageSize}`;

  if (categoryIds) {
    url += `&category_ids=${categoryIds}`;
  }
  const response = await instance.get(url);

  return response.data;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsResponse>) => {
        state.status = "succeeded";
        state.news = action.payload.results;
        state.totalCount = action.payload.count; // Устанавливаем общее количество новостей
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Не удалось получить новости";
      })
      .addCase(fetchMoreNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoreNews.fulfilled, (state, action: PayloadAction<NewsResponse>) => {
        state.status = "succeeded";
        state.news = [...state.news, ...action.payload.results];
        state.totalCount = action.payload.count; // Обновляем общее количество новостей
      })
      .addCase(fetchMoreNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Не удалось получить новости";
      });
  },
});

export default newsSlice.reducer;

export const { incrementPage } = newsSlice.actions;

export const selectNews = (state: RootState) => state.news.news;
export const selectNewsStatus = (state: RootState) => state.news.status;
export const selectNewsError = (state: RootState) => state.news.error;
export const selectCurrentPage = (state: RootState) => state.news.currentPage;
export const selectTotalCount = (state: RootState) => state.news.totalCount;
