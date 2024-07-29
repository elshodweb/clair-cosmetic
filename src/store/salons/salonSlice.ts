// src/store/salons/salonsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '@/utils/axiosInstance';

// Типы данных для `Salon`
interface ContactInformation {
  title: string;
  type: string;
}

interface Salon {
  id: string;
  name: string;
  city: string;
  work_schedule: string;
  images: string[];
  contact_informations: ContactInformation[];
}

interface SalonsState {
  salons: Salon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Начальное состояние
const initialState: SalonsState = {
  salons: [],
  status: 'idle',
  error: null,
};

// Асинхронный thunk для получения салонов
export const fetchSalons = createAsyncThunk(
  'salons/fetchSalons',
  async () => {
    const response = await instance.get('/salons/');
    return response.data;
  }
);

// Slice
const salonsSlice = createSlice({
  name: 'salons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.salons = action.payload;
      })
      .addCase(fetchSalons.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message || 'Failed to fetch salons';
      });
  },
});

export default salonsSlice.reducer;
