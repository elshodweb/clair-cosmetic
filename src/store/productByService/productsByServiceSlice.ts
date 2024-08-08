// store/products/productsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import instance from "@/utils/axiosInstance";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "productByService/fetchProducts",
  async (serviceId: string | string[]) => {
    const response = await instance.get(`/products/?service_ids=${serviceId}`);


    return response.data.results;
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
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const selectProducts = (state: RootState) =>
  state.productByService.products;
export const selectProductsStatus = (state: RootState) =>
  state.productByService.status;
export const selectProductsError = (state: RootState) =>
  state.productByService.error;

export default productsSlice.reducer;
