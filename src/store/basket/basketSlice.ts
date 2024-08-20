// src/store/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type basketTypeType = "Услуги" | "Товары";
export interface AuthState {
  isBasketVisible: boolean;
  basketSwitch: basketTypeType;
}

const initialState: AuthState = {
  isBasketVisible: false,
  basketSwitch: "Услуги",
};

const authSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketVisible(state, action: PayloadAction<boolean>) {
      state.isBasketVisible = action.payload;
    },
    switchBasket(state, action: PayloadAction<basketTypeType>) {
      state.basketSwitch = action.payload;
    },
  },
});

export const { setBasketVisible, switchBasket } = authSlice.actions;
export default authSlice.reducer;
