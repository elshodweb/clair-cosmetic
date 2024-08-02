// src/store/brands/brandsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '@/utils/axiosInstance';

// Тип данных для `Brand`
interface Brand {
  id: string;
  title: string;
}

interface BrandsState {
  brands: Brand[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Начальное состояние
const initialState: BrandsState = {
  brands: [],
  status: 'idle',
  error: null,
};

// Асинхронный thunk для получения списка брендов
export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async () => {
    const response = await instance.get('/products/brands/');
    return response.data;
  }
);

// Slice
const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch brands';
      });
  },
});

export default brandsSlice.reducer;
