import "@/styles/globals.scss";
import "@/styles/calendar.scss";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import "swiper/scss";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "900"],
});
const isAuth = true;
export default function App({ Component, pageProps }: AppProps) {
  if (isAuth) {
    return (
      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    );
  }
}
