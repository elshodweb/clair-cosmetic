import { http } from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface SelectedMastersState {
  data: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SelectedMastersState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchSelectedMasters = createAsyncThunk(
  "selectedMasters/fetchSelectedMasters",
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
      `/staffs/favorites/?page=${page}&page_size=${page_size}`
    );
    
    const data = await response.data.results;
    return data;
  }
);

const selectedMastersSlice = createSlice({
  name: "selectedMasters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedMasters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSelectedMasters.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchSelectedMasters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default selectedMastersSlice.reducer;
