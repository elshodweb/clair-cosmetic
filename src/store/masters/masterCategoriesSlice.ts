// src/store/Master/MasterCategoriesSlice.ts

import instance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Типы данных для `product categories`
interface masterCategory {
  id: string;
  name: string;
}

interface masterCategoriesState {
  categories: masterCategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Начальное состояние
const initialState: masterCategoriesState = {
  categories: [],
  status: "idle",
  error: null,
};

// Асинхронный thunk для получения `Master categories`
export const fetchMasterCategories = createAsyncThunk(
  "masterCategories/fetchMasterCategories",
  async () => {
    const response = await instance.get("/specializations/");
    const categories = response.data;
    return categories;
  }
);

// Slice
const masterCategoriesSlice = createSlice({
  name: "masterCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasterCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMasterCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchMasterCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch master categories";
      });
  },
});

export default masterCategoriesSlice.reducer;
