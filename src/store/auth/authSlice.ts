// src/store/auth/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoginVisible: boolean;
  isRegisterVisible: boolean;
  isAuth: boolean | null;
}

const initialState: AuthState = {
  isLoginVisible: false,
  isRegisterVisible: false,
  isAuth: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginVisible(state, action: PayloadAction<boolean>) {
      state.isLoginVisible = action.payload;
    },
    setRegisterVisible(state, action: PayloadAction<boolean>) {
      state.isRegisterVisible = action.payload;
    },
    setAuth(state, action: PayloadAction<boolean | null>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setLoginVisible, setRegisterVisible, setAuth } = authSlice.actions;
export default authSlice.reducer;
