import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import instance from "@/utils/axiosInstance";

interface Service {
  id: string;
  name: string;
  // Add other relevant fields here
}

interface ServicesState {
  services: Service[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  status: "idle",
  error: null,
};

export const fetchServicesByFilter = createAsyncThunk(
  "services/fetchServicesByFilter",
  async (params: { category_ids?: string | null; search?: string }) => {
    const { category_ids, search } = params;

    let url = "/services/?page=1&page_size=8";

    // Add category_ids to URL if provided
    if (category_ids) {
      url += `&category_ids=${category_ids}`;
    }

    // Add search parameter to URL if provided
    if (search) {
      url += `${category_ids ? "&" : "?"}search=${search}`;
    }

    const response = await instance.get(url);
    
    return response.data.results;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicesByFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicesByFilter.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServicesByFilter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const selectServices = (state: RootState) => state.servicesByFilter.services;
export const selectServicesStatus = (state: RootState) => state.servicesByFilter.status;
export const selectServicesError = (state: RootState) => state.servicesByFilter.error;

export default servicesSlice.reducer;
