import { AnimateSharedLayout } from "framer-motion";
import "focus-visible";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AnimateSharedLayout>
      <Component {...pageProps} />
    </AnimateSharedLayout>
  );
}

export default MyApp;
