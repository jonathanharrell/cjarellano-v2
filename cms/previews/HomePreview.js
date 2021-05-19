import React from "react";
import Link from "next/link";

function CategoryPreview({ entry }) {
  const title = entry.getIn(["data", "title"]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="relative mb-6" style={{ height: "550px" }}>
        <div className="h-full overflow-hidden">
          <figure className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src="/static/img/cj-home.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top transition-all ease-out duration-300"
              aria-hidden="true"
            />
            <div className="absolute top-0 z-10 w-full h-1/3 bg-gradient-to-b from-gray-900"/>
            <div className="absolute bottom-0 z-10 w-full h-1/2 bg-gradient-to-t from-gray-900"/>
          </figure>
        </div>
        <div className="absolute inset-0 z-10 w-full h-full">
          <div className="container h-full">
            <div className="flex flex-col items-start justify-center 2xl:max-w-6xl h-full mx-auto">
              <div className="pt-12">
                <h1 className="mb-4 text-shadow text-2xl md:text-3xl font-semibold">
                  {title}
                </h1>
                <div className="flex flex-wrap text-4xl md:text-5xl lg:text-6xl font-bold">
                  <Link href="/category/writer">
                    <a
                      id="writer"
                      className="primary-link relative hover:text-magenta transform hover:scale-105 transition-transform ease-out duration-300 group"
                    >
                      <span className="absolute -top-3 -bottom-3 -left-4 -right-2 bg-white opacity-0 group-hover:opacity-100 shadow-xl transition-opacity ease-out duration-300"/>
                      <span className="relative z-10">Writer</span>
                      <span>.</span>
                    </a>
                  </Link>
                  <Link href="/category/director">
                    <a
                      id="director"
                      className="primary-link relative pl-4 hover:text-cyan transform hover:scale-105 transition-transform ease-out duration-300 group"
                    >
                      <span className="absolute -top-3 -bottom-3 -left-1 -right-2 bg-white opacity-0 group-hover:opacity-100 shadow-xl transition-opacity ease-out duration-300"/>
                      <span className="relative z-10">Director</span>
                      <span>.</span>
                    </a>
                  </Link>
                  <Link href="/category/editor">
                    <a
                      id="editor"
                      className="primary-link relative pl-4 hover:text-yellow transform hover:scale-105 transition-transform ease-out duration-300 group"
                    >
                      <span className="absolute -top-3 -bottom-3 -left-1 -right-2 bg-white opacity-0 group-hover:opacity-100 shadow-xl transition-opacity ease-out duration-300"/>
                      <span className="relative z-10">Editor</span>
                      <span>.</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default CategoryPreview;
