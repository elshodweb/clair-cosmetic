import instance, { http } from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface ProductState {
  product: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  status: "idle",
  error: null,
};

// Асинхронный thunk для запроса данных продукта
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (productId: string) => {
    const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

    const response = await http(token).get(`/products/${productId}/`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct(state) {
      state.product = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch product";
      });
  },
});

export const { resetProduct } = productSlice.actions;

export default productSlice.reducer;
