import Header from "../components/header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div>
        <Header/>
        <Component {...pageProps} />
        <footer>
          footer
        </footer>
      </div>
    </div>
  );
}

export default MyApp;
