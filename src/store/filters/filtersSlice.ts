import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  brand_ids: string;
  category_ids: string;
  ordering: string;
  page: number;
  page_size: number;
}

const initialState: FilterState = {
  brand_ids: "",
  category_ids: "",
  ordering: "",
  page: 1,
  page_size: 27,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrandIds(state, action: PayloadAction<string>) {
      state.brand_ids = action.payload;
    },
    setCategoryIds(state, action: PayloadAction<string>) {
      state.category_ids = action.payload;
    },
    setOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.page_size = action.payload;
    },
    resetFilters(state) {
      // Сбрасываем фильтры на начальное состояние
      state.brand_ids = "";
      state.category_ids = "";
      state.ordering = "";
      state.page = 1;
      state.page_size = 27;
    },
  },
});

export const {
  setBrandIds,
  setCategoryIds,
  setOrdering,
  setPage,
  setPageSize,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
