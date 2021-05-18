import React from "react";

function ProjectPreview({ entry, widgetFor }) {
  const title = entry.getIn(["data", "title"]);
  const type = entry.getIn(["data", "type"]);
  const image = entry.getIn(["data", "image"]);
  const body = widgetFor("body");

  return (
    <div className="min-h-screen p-16 bg-gray-900 text-white">
      <div className="container">
        <div className="2xl:max-w-6xl mx-auto">
          <article>
            <div className="grid gap-y-8 lg:gap-16 grid-cols-1 lg:grid-cols-12 pb-6">
              <div className="lg:order-1 lg:col-span-6 xl:col-span-5 relative">
                <figure className="relative lg:h-full overflow-hidden rounded-2xl shadow-xl" style={{ padding: "35% 0" }}>
                  <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
                </figure>
              </div>
              <div className="lg:col-span-6 xl:col-span-7 relative z-10">
                <header className="mb-6">
                  <p className="mb-2 font-semibold tracking-wide text-gray-400">{type}</p>
                  <h1 className="text-5xl font-bold leading-none">{title}</h1>
                </header>
                <div className="project-content text-lg leading-relaxed text-gray-400">
                  {body}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default ProjectPreview;
