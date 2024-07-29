// src/store/products/productsSlice.ts

import instance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Типы данных для `products`
interface Product {
  id: string;
  name: string;
  price: number;
  // другие поля продукта
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalPages: number;
}

interface FetchProductsParams {
  categoryId?: string;
  page: number;
  pageSize: number;
}

// Начальное состояние
const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
  totalPages: 0,
};

// Асинхронный thunk для получения `products`
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ categoryId, page, pageSize }: FetchProductsParams) => {
    let url = `/products/?`;
    if (categoryId) {
      url += `category_ids=${categoryId}&`;
    }
    url += `page=${page}&page_size=${pageSize}`
    const response = await instance.get(url);
    return response.data;
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;