// src/store/services/servicesSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "@/utils/axiosInstance";

// Типы данных для `Service`
interface Service {
  id: string;
  title: string;
  description: string;
  price_min: number;
  duration: string;
  // Добавьте другие поля, которые соответствуют данным из API
}

interface ServicesState {
  services: Service[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Начальное состояние
const initialState: ServicesState = {
  services: [],
  status: "idle",
  error: null,
};

// Асинхронный thunk для получения `services` по `staff_ids`
export const fetchServicesByMaster = createAsyncThunk(
  "services/fetchServices",
  async (staffId: string) => {
    const response = await instance.get(`/services/?staff_ids=${staffId}`);
    return response.data;
  }
);

// Slice
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicesByMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicesByMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload.results;
      })
      .addCase(fetchServicesByMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch services";
      });
  },
});

export default servicesSlice.reducer;
