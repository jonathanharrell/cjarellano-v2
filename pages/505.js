import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Custom505() {
  return (
    <main className="flex items-center flex-1 pt-20 lg:pt-32 pb-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-5xl font-bold leading-none text-center">
              A server-side error occurred
            </h1>
          </header>
          <p className="text-lg text-center text-gray-400">
            Well, that's embarrassing. We've run into a bit of an issue here...
          </p>
        </div>
      </div>
    </main>
  );
}
