// src/pages/_app.tsx

import { Provider } from "react-redux";
import store from "@/store/store";
import "@/styles/globals.scss";
import "@/styles/calendar.scss";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import "swiper/scss";
import Auth from "@/components/screens/auth/Auth";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={roboto.className}>
        {<Auth />}
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
