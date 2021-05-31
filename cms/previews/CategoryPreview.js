import React from "react";
import { PlayIcon } from "@heroicons/react/solid";
import { getCategoryColor } from "../../helpers";

const CategoryPreview = ({ entry, widgetsFor }) => {
  const title = entry.getIn(["data", "title"]);
  const action = entry.getIn(["data", "action"]);
  const headline = entry.getIn(["data", "headline"]);
  const image = entry.getIn(["data", "image"]);
  const reels = widgetsFor("reels");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="relative mb-6 md:mb-12" style={{ height: "450px" }}>
        <figure className="absolute inset-0 w-full h-full overflow-hidden">
            <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute top-0 z-10 w-full h-1/2 bg-gradient-to-b from-gray-900"/>
          <div className="absolute bottom-0 z-10 w-full h-3/4 bg-gradient-to-t from-gray-900"/>
        </figure>
          <div className="absolute inset-0 z-10 w-full h-full">
            <div className="container h-full">
              <div className="flex flex-col items-start justify-center 2xl:max-w-6xl h-full mx-auto">
                <div className="max-w-sm sm:max-w-lg lg:max-w-lg pt-20">
                  <h1 className="mb-4 text-shadow text-xl md:text-2xl font-semibold">
                    {title}
                  </h1>
                  <p className="text-shadow text-4xl md:text-5xl lg:text-6xl font-bold">
                    {headline}
                  </p>
                  {reels.toJS().length > 0 && (
                    <div className="mt-8">
                      {reels.map(reel => (
                        <button
                          key={reel.get("data").get("title")}
                          className="inline-flex items-center mr-4 mb-3 py-3 pl-4 pr-6 rounded-full border-2 border-white hover:bg-white font-semibold tracking-wide text-white hover:text-gray-900 transform hover:scale-105 transition-all ease-out duration-fast"
                        >
                          <PlayIcon className={`w-5 h-5 mr-1 text-${getCategoryColor(action)}`}/>
                          {reel.get("data").get("title")}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
      </header>
    </div>
  );
};

export default CategoryPreview;
