// src/store/staffs/staffsSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import instance, { http } from "@/utils/axiosInstance";

interface Staff {
  id: string;
  name: string;
}

interface StaffsState {
  staffs: Staff[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StaffsState = {
  staffs: [],
  status: "idle",
  error: null,
};

export const fetchStaffs = createAsyncThunk(
  "staffs/fetchStaffs",
  async (params: {
    search: string;
    specialization_category_slugs: string;
    specialization_ids: string | null;
  }) => {
    const { search, specialization_category_slugs, specialization_ids } =
      params;

    let url = "/staffs/";
    const queryParams: string[] = [];

    if (specialization_category_slugs) {
      queryParams.push(
        `specialization_category_slugs=${encodeURIComponent(
          specialization_category_slugs
        )}`
      );
    }

    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }

    if (specialization_ids) {
      queryParams.push(
        `specialization_ids=${encodeURIComponent(specialization_ids)}`
      );
    }

    if (queryParams.length > 0) {
      url += "?" + queryParams.join("&");
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    const response = await http(token).get(url);
    return response.data;
  }
);

const staffsSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staffs = action.payload.results;
      })
      .addCase(fetchStaffs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const selectStaffs = (state: RootState) => state.staffs.staffs;
export const selectStaffsStatus = (state: RootState) => state.staffs.status;
export const selectStaffsError = (state: RootState) => state.staffs.error;

export default staffsSlice.reducer;
