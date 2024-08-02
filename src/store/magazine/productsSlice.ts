// src/store/products/productsSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "@/utils/axiosInstance";

// Типы данных для `Product`
interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  // добавьте любые другие поля, которые нужны для продукта
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pagesCount: number;
}

// Начальное состояние
const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
  pagesCount: 0,
};

// Асинхронный thunk для получения продуктов с параметрами
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: {
    brand_ids?: string;
    category_ids?: string;
    ordering?: string;
    page?: number;
    page_size?: number;
    type?: string;
  }) => {
    const response = await instance.get("/products/", {
      params: {
        brand_ids: params.brand_ids?.length ? params.brand_ids : null,
        category_ids: params.category_ids?.length ? params.category_ids : null,
        ordering: params.ordering?.length ? params.ordering : null,
        page: params.page,
        page_size: params.page_size,
        type: params.type || "product", // 'type' по умолчанию 'product'
      },
    });
    return response.data;
  }
);

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
        state.pagesCount = Math.ceil(action.payload.count / 27);
        state.products = action.payload.results;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
