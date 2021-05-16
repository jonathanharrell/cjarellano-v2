import Header from "../components/header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="dark">
      <div className="min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header/>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;