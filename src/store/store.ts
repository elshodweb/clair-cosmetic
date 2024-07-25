// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"; // импорт authReducer
import newsReducer from "./newStories/storiesSlice"; // импорт newsReducer
import servicesReducer from "./services/servicesSlice";
import servicesCategoriesReducer from "./services/servicesCategoriesSlice";
import productCategoriesReducer from "./product/productCategoriesSlice";
import products from "./product/productsSlice";
import masterCategories from "./masters/masterCategoriesSlice";
import masters from "./masters/mastersSlice";
import homeNews from "./news/homeNewsSlice";
const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  news: newsReducer,

  services: servicesReducer,
  servicesCategories: servicesCategoriesReducer,
  productCategories: productCategoriesReducer,
  products: products,
  masterCategories: masterCategories,
  masters: masters,
  homeNews: homeNews,
  // другие редукторы
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
