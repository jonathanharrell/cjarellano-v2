import React from "react";
import Meta from "../components/meta";

const Custom505 = () => (
  <>
    <Meta title="505 - C.J. Arellano"/>
    <div className="flex items-center flex-1 pt-24 lg:pt-32 pb-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-none text-center">
              A server-side error occurred
            </h1>
          </header>
          <p className="text-lg text-center text-gray-300">
            Well, that's embarrassing. We've run into a bit of an issue here...
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Custom505;
