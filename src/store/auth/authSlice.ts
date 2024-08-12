// src/store/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isLoginVisible: boolean;
  isRegisterVisible: boolean;
  isPhoneVerificationVisible: boolean;
  isAccountDataVisible: boolean;
  isFinishedModalVisible: boolean;

  timer: number;
  isAuth: boolean | null;
}

const initialState: AuthState = {
  isLoginVisible: false,
  isRegisterVisible: false,
  isPhoneVerificationVisible: false,
  isAccountDataVisible: false,
  isFinishedModalVisible: false,

  timer: 301,
  isAuth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginVisible(state, action: PayloadAction<boolean>) {
      state.isLoginVisible = action.payload;
    },
    setRegisterVisible(state, action: PayloadAction<boolean>) {
      state.isRegisterVisible = action.payload;
    },
    setPhoneVerificationVisible(state, action: PayloadAction<boolean>) {
      state.isPhoneVerificationVisible = action.payload;
    },
    setAccountDataVisible(state, action: PayloadAction<boolean>) {
      state.isAccountDataVisible = action.payload;
    },
    setFinishedModalVisible(state, action: PayloadAction<boolean>) {
      state.isFinishedModalVisible = action.payload;
    },
    setAuth(state, action: PayloadAction<boolean | null>) {
      state.isAuth = action.payload;
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
  },
});

export const {
  setLoginVisible,
  setRegisterVisible,
  setPhoneVerificationVisible,
  setAccountDataVisible,
  setFinishedModalVisible,

  setAuth,
  setTimer,
} = authSlice.actions;
export default authSlice.reducer;
