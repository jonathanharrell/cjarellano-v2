import React from "react";
import { AnimateSharedLayout } from "framer-motion";
import "focus-visible";
import "../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

function MyApp({ Component, pageProps, router }) {
  if (router.route.includes("/admin")) {
    return <Component {...pageProps} />;
  }

  return (
    <AnimateSharedLayout type="crossfade">
      <div className="flex flex-col min-h-screen">
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </div>
    </AnimateSharedLayout>
  );
}

export default MyApp;
