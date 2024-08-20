// src/store/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  service: any;
  time: string;
  salon: any;
  master: any;
  salonId: string | null;
  masterId: string | null;
  isSalonChooseVisible: boolean;
  isConfirmMassterVisible: boolean;
  isChooseMassterVisible: boolean;
  isChooseTimeVisible: boolean;
  isConfirmBookingVisible: boolean;
  isConfirmBookingTimeVisible: boolean;
}

const initialState: AuthState = {
  service: null,
  time: "",
  master: {
    id: null,
    name: "Любой мастер",
    specialization: { title: "Мы сами выберем мастера" },
    avatar: "/images/profile/profile.png",
  },
  salon: {
    id: null,
    name: "Любой салон",
    city: "Мы сами выберем салон",
    images: [null],
  },
  salonId: null,
  masterId: null,
  isSalonChooseVisible: false,
  isChooseMassterVisible: false,
  isConfirmMassterVisible: false,
  isChooseTimeVisible: false,
  isConfirmBookingVisible: false,
  isConfirmBookingTimeVisible: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setService(state, action: PayloadAction<any>) {
      state.service = action.payload;
    },
    setTime(state, action: PayloadAction<string>) {
      state.time = action.payload;
    },
    setSalon(state, action: PayloadAction<any>) {
      state.salon = action.payload;
    },
    setMaster(state, action: PayloadAction<any>) {
      state.master = action.payload;
    },
    setSalonId(state, action: PayloadAction<any>) {
      state.salonId = action.payload;
    },
    setMasterId(state, action: PayloadAction<any>) {
      state.masterId = action.payload;
    },
    setSalonChooseVisible(state, action: PayloadAction<boolean>) {
      state.isSalonChooseVisible = action.payload;
    },
    setChooseMassterVisible(state, action: PayloadAction<boolean>) {
      state.isChooseMassterVisible = action.payload;
    },
    setConfirmMassterVisible(state, action: PayloadAction<boolean>) {
      state.isConfirmMassterVisible = action.payload;
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
  setTime,
  setService,
  setMaster,
  setSalon,
  setMasterId,
  setSalonId,
  setChooseMassterVisible,
  setSalonChooseVisible,
  setConfirmMassterVisible,
  setChooseTimeVisible,
  setConfirmBookingTimeVisible,
  setConfirmBookingVisible,
} = authSlice.actions;
export default authSlice.reducer;
