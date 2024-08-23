// src/store/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type basketTypeType = "Услуги" | "Товары";
export interface AuthState {
  isBasketVisible: boolean;
  isPaynentVisible: boolean;
  basketSwitch: basketTypeType;
}

const initialState: AuthState = {
  isBasketVisible: false,
  isPaynentVisible: false,
  basketSwitch: "Услуги",
};

const authSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketVisible(state, action: PayloadAction<boolean>) {
      state.isBasketVisible = action.payload;
    },
    setPaymentVisible(state, action: PayloadAction<boolean>) {
      state.isPaynentVisible = action.payload;
    },
    switchBasket(state, action: PayloadAction<basketTypeType>) {
      state.basketSwitch = action.payload;
    },
  },
});

export const { setBasketVisible, setPaymentVisible, switchBasket } =
  authSlice.actions;
export default authSlice.reducer;
