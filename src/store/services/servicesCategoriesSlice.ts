import instance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
}

interface ServiceCategoriesState {
  categories: ServiceCategory[];
  subCategories: ServiceCategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServiceCategoriesState = {
  categories: [],
  subCategories: [],
  status: "idle",
  error: null,
};

export const fetchServiceCategories = createAsyncThunk(
  "servicesCategories/fetchServiceCategories",
  async () => {
    const response = await instance.get("/services/categories/");
    const categ = response.data;
    return categ;
  }
);

const servicesCategoriesSlice = createSlice({
  name: "servicesCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiceCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload?.filter((i: any) => i.parent == null);
        state.subCategories = action.payload?.filter(
          (i: any) => i.parent !== null
        );
      })
      .addCase(fetchServiceCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch service categories";
      });
  },
});

export default servicesCategoriesSlice.reducer;
