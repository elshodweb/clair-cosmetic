// src/store/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isSalonChooseVisible: boolean;
  isChooseMassterVisible: boolean;
  isChooseTimeVisible: boolean;
  isConfirmBookingVisible: boolean;
  isConfirmBookingTimeVisible: boolean;
}

const initialState: AuthState = {
  isSalonChooseVisible: false,
  isChooseMassterVisible: false,
  isChooseTimeVisible: false,
  isConfirmBookingVisible: false,
  isConfirmBookingTimeVisible: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSalonChooseVisible(state, action: PayloadAction<boolean>) {
      state.isSalonChooseVisible = action.payload;
    },
    setChooseMassterVisible(state, action: PayloadAction<boolean>) {
      state.isChooseMassterVisible = action.payload;
    },
    setChooseTimeVisible(state, action: PayloadAction<boolean>) {
      state.isChooseTimeVisible = action.payload;
    },
    setConfirmBookingVisible(state, action: PayloadAction<boolean>) {
      state.isConfirmBookingVisible = action.payload;
    },

    setConfirmBookingTimeVisible(state, action: PayloadAction<boolean>) {
      state.isConfirmBookingTimeVisible = action.payload;
    },
  },
});

export const {
  setChooseMassterVisible,
  setSalonChooseVisible,
  setChooseTimeVisible,
  setConfirmBookingTimeVisible,
  setConfirmBookingVisible,
} = authSlice.actions;
export default authSlice.reducer;
