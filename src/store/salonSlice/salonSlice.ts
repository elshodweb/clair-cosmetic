// salonSlice.ts
import instance, { http } from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface SalonState {
  data: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Начальное состояние
const initialState: SalonState = {
  data: null,
  status: 'idle',
  error: null,
};

// Асинхронный thunk для получения данных о салоне
export const fetchSalon = createAsyncThunk(
  'salon/fetchSalon',
  async (id: string) => {
    const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;
    const response = await http(token).get(`/staffs/${id}/`);
    const data = await response.data;
    return data;
  }
);

const salonSlice = createSlice({
  name: 'salon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalon.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSalon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default salonSlice.reducer;
