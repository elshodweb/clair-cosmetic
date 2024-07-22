import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoginVisible: boolean;
  isRegisterVisible: boolean;
  isPhoneVerificationVisible: boolean; // Добавлено для видимости подтверждения телефона
  isAccountDataVisible: boolean; // Добавлено для видимости данных аккаунта
  isFinishedModalVisible: boolean;
  isAuth: boolean | null;
}

const initialState: AuthState = {
  isLoginVisible: false,
  isRegisterVisible: false,
  isPhoneVerificationVisible: false,
  isAccountDataVisible: false,
  isFinishedModalVisible: false,
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
  },
});

export const {
  setLoginVisible,
  setRegisterVisible,
  setPhoneVerificationVisible,
  setAccountDataVisible,
  setFinishedModalVisible,
  setAuth,
} = authSlice.actions;
export default authSlice.reducer;
