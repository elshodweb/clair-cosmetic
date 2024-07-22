// src/pages/_app.tsx

import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import "@/styles/globals.scss";
import "@/styles/calendar.scss";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "swiper/scss";
import Auth from "@/components/screens/auth/Auth";
import { PersistGate } from "redux-persist/integration/react";
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
          <Component {...pageProps} />
        </div>
        <ToastContainer autoClose={3000} />
      </PersistGate>
    </Provider>
  );
}
