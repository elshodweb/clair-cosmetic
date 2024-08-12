// src/store/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type basketSwitchType = "product" | "service";

export interface AuthState {
  isBasketVisible: boolean;
  basketSwitch: basketSwitchType;
}

const initialState: AuthState = {
  isBasketVisible: false,
  basketSwitch: "product",
};

const authSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketVisible(state, action: PayloadAction<boolean>) {
      state.isBasketVisible = action.payload;
    },
    switchBasket(state, action: PayloadAction<basketSwitchType>) {
      state.basketSwitch = action.payload;
    },
  },
});

export const { setBasketVisible, switchBasket } = authSlice.actions;
export default authSlice.reducer;
