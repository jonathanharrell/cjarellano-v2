import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Custom404() {
  return (
    <main className="flex items-center flex-1 pt-20 lg:pt-32 pb-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-5xl font-bold leading-none text-center">
              Page not found
            </h1>
          </header>
          <p className="text-lg text-center text-gray-400">
            Waahh sorry! No dice here. Try searching again, maybe?
          </p>
        </div>
      </div>
    </main>
  );
}
