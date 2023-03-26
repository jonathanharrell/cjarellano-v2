import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { AnimateSharedLayout } from "framer-motion";
import "focus-visible";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/globals.css";

const App = ({ Component, pageProps, router }) => {
  const mainRef = useRef();

  if (router.route.includes("/admin")) {
    return <Component {...pageProps} />;
  }

  const skipToContent = () => {
    mainRef.current.focus();
  };

  useEffect(() => {
    const handleRouteChange = () => {
      mainRef.current.focus();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <script async defer src="https://www.googletagmanager.com/gtag/js?id=G-PJ4MFW5RE2"/>
        <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-PJ4MFW5RE2');`}}/>
        <script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"/>
        <script async defer src="https://platform.twitter.com/widgets.js" charSet="utf-8"/>
      </Head>
      <AnimateSharedLayout type="crossfade">
        <div className="flex flex-col min-h-screen">
          <a
            id="skip-link"
            href="#main"
            className="block absolute z-30 left-4 py-2 px-4 rounded-full bg-gray-800 shadow-lg hover:shadow-2xl opacity-0 focus:opacity-100 text-gray-100 transform -translate-y-full focus:translate-y-4"
            onClick={skipToContent}
          >
            Skip to content
          </a>
          <Header/>
          <main ref={mainRef} id="main" tabIndex="-1" aria-label="Main Content">
            <Component {...pageProps} />
          </main>
          <Footer/>
        </div>
      </AnimateSharedLayout>
    </>
  );
};

export default App;
