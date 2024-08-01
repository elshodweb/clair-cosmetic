// src/store/services/servicesSlice.ts

import instance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Типы данных для `services`
interface Service {
  id: string;
  name: string;
  description: string;
  // другие поля
}

interface ServiceState {
  services: Service[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Начальное состояние
const initialState: ServiceState = {
  services: [],
  status: 'idle',
  error: null,
};

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await instance.get('/services/');

  
  
  return response.data;
});


const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch services';
      });
  },
});

export default servicesSlice.reducer;
