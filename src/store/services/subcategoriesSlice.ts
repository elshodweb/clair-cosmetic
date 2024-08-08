import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import instance from "@/utils/axiosInstance";

interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

interface SubcategoriesState {
  subcategories: Subcategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubcategoriesState = {
  subcategories: [],
  status: "idle",
  error: null,
};

export const fetchSubcategories = createAsyncThunk(
  "subcategories/fetchSubcategories",
  async (parentSlug: string) => {
    const response = await instance.get(
      `/services/categories/?parent_slugs=${encodeURIComponent(parentSlug)}`
    );
    return response.data;
  }
);

const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const selectSubcategories = (state: RootState) =>
  state.servicesSubCategory.subcategories;
export const selectSubcategoriesStatus = (state: RootState) =>
  state.servicesSubCategory.status;
export const selectSubcategoriesError = (state: RootState) =>
  state.servicesSubCategory.error;

export default subcategoriesSlice.reducer;
