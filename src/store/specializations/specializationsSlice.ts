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

export const fetchSpecializations = createAsyncThunk<
  Specialization[],
  { categorySlugs: string }
>("specializations/fetchSpecializations", async ({ categorySlugs }) => {
  const response = await instance.get(
    `/specializations/?category_slugs=${categorySlugs}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  return response.data;
});

const specializationsSlice = createSlice({
  name: "specializations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecializations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSpecializations.fulfilled,
        (state, action: PayloadAction<Specialization[]>) => {
          state.status = "succeeded";
          state.specializations = action.payload;
        }
      )
      .addCase(fetchSpecializations.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Не удалось получить специальности";
      });
  },
});

export default specializationsSlice.reducer;

// Selectors
export const selectSpecializations = (state: RootState) =>
  state.specializations.specializations;
export const selectSpecializationsStatus = (state: RootState) =>
  state.specializations.status;
export const selectSpecializationsError = (state: RootState) =>
  state.specializations.error;
