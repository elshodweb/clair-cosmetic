import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import instance from "@/utils/axiosInstance";

interface Specialization {
  id: string;
  title: string;
}

interface SpecializationsState {
  specializations: Specialization[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SpecializationsState = {
  specializations: [],
  status: "idle",
  error: null,
};

export const fetchSpecializationsForService = createAsyncThunk<
  Specialization[],
  { categorySlugs: string }
>(
  "specializationsForService/fetchSpecializationsForService",
  async ({ categorySlugs }) => {
    const response = await instance.get(
      `/services/categories/?parent_slugs=${categorySlugs}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return response.data;
  }
);

const specializationsForService = createSlice({
  name: "specializationsForService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecializationsForService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSpecializationsForService.fulfilled,
        (state, action: PayloadAction<Specialization[]>) => {
          state.status = "succeeded";
          state.specializations = action.payload;
        }
      )
      .addCase(fetchSpecializationsForService.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Не удалось получить специальности";
      });
  },
});

export default specializationsForService.reducer;

// Selectors
export const selectSpecializationsForService = (state: RootState) =>
  state.specializationsForService.specializations;
export const selectSpecializationsForServiceStatus = (state: RootState) =>
  state.specializationsForService.status;
export const selectSpecializationsForServiceError = (state: RootState) =>
  state.specializationsForService.error;
