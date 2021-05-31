import React from "react";

function CategoryPreview({ entry, widgetFor }) {
  const title = entry.getIn(["data", "title"]);
  const image = entry.getIn(["data", "image"]);
  const body = widgetFor("body");

  return (
    <div className="min-h-screen p-16 bg-gray-900 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <article>
            <figure className="lg:max-w-lg lg:float-right lg:-mr-24 mb-12 lg:p-12 transform lg:rotate-6">
              <img src={image} alt="" className="w-full rounded-2xl shadow-xl"/>
            </figure>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-none">{title}</h1>
            </header>
            <div className="max-w-none prose lg:prose-xl text-gray-400">
              {body}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default CategoryPreview;
