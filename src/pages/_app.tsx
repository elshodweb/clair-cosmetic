// src/pages/_app.tsx

import { Provider, useSelector } from "react-redux";
import { persistor, RootState, store } from "@/store/store";
import "@/styles/index.scss";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "swiper/scss";
import Auth from "@/components/screens/auth/Auth";
import { PersistGate } from "redux-persist/integration/react";
import CodeConfirm from "@/components/UI/codeConfirm/CodeConfirm";
import BookingScreen from "@/components/screens/booking/bookingScreen";
const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={roboto.className}>
          {<Auth />}
          <CodeConfirm />
          <BookingScreen />
          <Component {...pageProps} />
        </div>
        <ToastContainer autoClose={3000} />
      </PersistGate>
    </Provider>
  );
}
