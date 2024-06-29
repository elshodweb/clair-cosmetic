import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], weight: ["400", "500"] });
const isAuth = true;
export default function App({ Component, pageProps }: AppProps) {
  if (isAuth) {
    return (
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    );
  }
}
