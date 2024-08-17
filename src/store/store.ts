// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice"; // импорт authReducer
import newsStoriesReducer from "./newStories/storiesSlice"; // импорт newsReducer
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
import newsReducer from "./news/newsSlice";
import specializationsReducer from "./specializations/specializationsSlice";
import staffsReducer from "./staffs/staffsSlice";
import servicesSubCategoryReducer from "./services/subcategoriesSlice";
import servicesByFilterReducer from "./services/servicesSliceByFilters";
import singleService from "./services/singleService";
import productByServiceReducer from "./productByService/productsByServiceSlice";
import basketSlice from "./basket/basketSlice";
import bookingSlice from "./booking/bookingSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,

  filters: filtersReducer,

  news: newsReducer,
  newsStoris: newsStoriesReducer,
  homeNews: homeNews,
  newsCategory: newsCategoryReducer,

  service: singleService,
  services: servicesReducer,
  servicesByFilter: servicesByFilterReducer,
  servicesSubCategory: servicesSubCategoryReducer,
  servicesCategories: servicesCategoriesReducer,

  products: productsReducer,
  productByService: productByServiceReducer,
  productsHome: products,
  productCategories: productCategoriesReducer,
  brands: brandsReducer,
  singleProduct: singleProduct,
  viewedProducts: viewedProductsReducer,

  staffs: staffsReducer,
  masters: masters,
  masterCategories: masterCategories,
  servicesByMaster: servicesByMasterReducer,

  salon: salonReducer,
  salons: salonsReducer,

  specializations: specializationsReducer,
  basket: basketSlice,
  booking: bookingSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
