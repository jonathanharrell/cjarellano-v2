import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const isAdmin = this.props. __NEXT_DATA__.page === "/admin";

    return (
      <Html lang="en" className={!isAdmin ? "bg-black" : ""}>
        <Head/>
        <body className={!isAdmin ? "min-h-screen bg-gray-900 text-white" : ""}>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
