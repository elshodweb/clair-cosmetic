// selectedProductsSlice.ts
import instance, { http } from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface SelectedProductsState {
  data: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: SelectedProductsState = {
  data: null,
  status: "idle",
  error: null,
};

// Async thunk for fetching selected products
export const fetchSelectedProducts = createAsyncThunk(
  "selectedProducts/fetchSelectedProducts",
  async ({
    page = 1,
    page_size = 12,
  }: {
    page?: number;
    page_size?: number;
  }) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    const response = await http(token).get(
      `/products/favorites/?page=${page}&page_size=${page_size}`
    );
    const data = await response.data.results;
    return data;
  }
);

const selectedProductsSlice = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSelectedProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchSelectedProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default selectedProductsSlice.reducer;
