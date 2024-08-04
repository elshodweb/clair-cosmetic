// src/store/viewedProductsSlice.ts
import { http } from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: string;
  title: string;
  price: number;
  previous_price: string | null;
  description: string;
  images: Array<{ image: string }>;
}

interface ViewedProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Асинхронный thunk для получения данных недавно просмотренных продуктов
export const fetchViewedProducts = createAsyncThunk(
  'viewedProducts/fetchViewed',
  async () => {
    const response = await http.get('/products/viewed/');
    return response.data;
  }
);

const initialState: ViewedProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

const viewedProductsSlice = createSlice({
  name: 'viewedProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViewedProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchViewedProducts.fulfilled, (state, action) => {
        state.products = action.payload.results;
        state.status = 'succeeded';
      })
      .addCase(fetchViewedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch viewed products';
      });
  },
});

export default viewedProductsSlice.reducer;
