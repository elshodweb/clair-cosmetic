import  { http } from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface serviceRecordsState {
  data: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: serviceRecordsState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchserviceRecords = createAsyncThunk(
  "serviceRecords/fetchserviceRecords",
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
      `/services/records/?page=${page}&page_size=${page_size}`
    );
    const data = await response.data.results;
    return data;
  }
);

const serviceRecordsSlice = createSlice({
  name: "serviceRecords",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchserviceRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchserviceRecords.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchserviceRecords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default serviceRecordsSlice.reducer;
