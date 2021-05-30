import React from "react";
import Head from "next/head";
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
        <a
          id="skip-link"
          href="#main"
          className="block absolute z-30 left-4 py-2 px-4 rounded-full bg-gray-800 shadow-lg hover:shadow-2xl opacity-0 focus:opacity-100 text-gray-100 transform -translate-y-full focus:translate-y-4"
        >
          Skip to content
        </a>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </div>
    </AnimateSharedLayout>
  );
}

export default MyApp;
