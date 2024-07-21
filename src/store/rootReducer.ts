// src/store/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // другие редукторы
});

export default rootReducer;
