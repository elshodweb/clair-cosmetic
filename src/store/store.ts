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
import products from "./productHomePage/productsSlice";
import masterCategories from "./masters/masterCategoriesSlice";
import masters from "./masters/mastersSlice";
import homeNews from "./news/homeNewsSlice";
import salonsReducer from "./salons/salonSlice"; // Импорт редуктора салонов
import salonReducer from "./salonSlice/salonSlice";
import servicesByMasterReducer from "./services/servicesSliceByMaster";
import productsReducer from "./magazine/productsSlice";
import brandsReducer from "./brands/brandsSlice";
import filtersReducer from "./filters/filtersSlice";
import singleProduct from "./singleProduct/productSlice";
import viewedProductsReducer from "./viewd/viewedProductsSlice";
import newsCategoryReducer from "./news/newsCategorySlice";
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
  productsHome: products,
  masterCategories: masterCategories,
  masters: masters,
  homeNews: homeNews,
  salons: salonsReducer,
  salon: salonReducer,
  products: productsReducer,
  brands: brandsReducer,
  servicesByMaster: servicesByMasterReducer,
  filters: filtersReducer,
  singleProduct: singleProduct,
  viewedProducts: viewedProductsReducer,
  newsCategory: newsCategoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
    }).concat(),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
