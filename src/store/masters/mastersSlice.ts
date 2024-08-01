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

interface mastersState {
  masters: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalPages: number;
}

interface FetchMastersParams {
  categoryId?: string;
  page: number;
  pageSize: number;
}

// Начальное состояние
const initialState: mastersState = {
  masters: [],
  status: "idle",
  error: null,
  totalPages: 0,
};

// Асинхронный thunk для получения `products`
export const fetchMasters = createAsyncThunk(
  "masters/fetchMasters",
  // 114b8111-3ed7-425a-b633-5a0e40045c8c
  async ({ categoryId, page, pageSize }: FetchMastersParams) => {
    let url = `/staffs/?`;
    if (categoryId) {
      
      url += `specialization_ids=${categoryId}&`;
    }
    url += `page=${page}&page_size=${pageSize}`
    const response = await instance.get(url);
    return response.data;
  }
);

const mastersSlice = createSlice({
  name: "masters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMasters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.masters = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMasters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default mastersSlice.reducer;
