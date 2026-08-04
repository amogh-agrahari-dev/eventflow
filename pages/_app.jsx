import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </>
  );
}
