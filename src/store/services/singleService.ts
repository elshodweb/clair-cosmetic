import instance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Определяем тип для состояния
interface ServiceState {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Определяем тип для данных услуги
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    title: string;
    id: string;
  };
}

// Начальное состояние
const initialState: ServiceState = {
  data: null,
  status: "idle",
  error: null,
};

// Асинхронный thunk для получения данных услуги
export const fetchService = createAsyncThunk<
  Service,
  string | string[] | undefined,
  { rejectValue: string }
>("services/fetchService", async (serviceId, { rejectWithValue }) => {
  try {
    const response = await instance.get(`/services/${serviceId}/`);

    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Слайс для управления данными услуги
const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default serviceSlice.reducer;
