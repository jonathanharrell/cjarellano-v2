import { AnimateSharedLayout } from "framer-motion";
import "focus-visible";
import "../styles/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <AnimateSharedLayout type="crossfade">
      <Component {...pageProps} />
      {/*<script src="https://platform.twitter.com/widgets.js"/>*/}
    </AnimateSharedLayout>
  );
}

export default MyApp;
