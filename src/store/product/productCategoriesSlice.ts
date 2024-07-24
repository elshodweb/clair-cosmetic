// src/store/product/productCategoriesSlice.ts

import instance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Типы данных для `product categories`
interface ProductCategory {
  id: string;
  name: string;
}

interface ProductCategoriesState {
  categories: ProductCategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Начальное состояние
const initialState: ProductCategoriesState = {
  categories: [],
  status: "idle",
  error: null,
};

// Асинхронный thunk для получения `product categories`
export const fetchProductCategories = createAsyncThunk(
  "productCategories/fetchProductCategories",
  async () => {
    const response = await instance.get("/products/categories/");
    const categories = response.data;
    return categories;
  }
);

// Slice
const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchProductCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch product categories";
      });
  },
});

export default productCategoriesSlice.reducer;
