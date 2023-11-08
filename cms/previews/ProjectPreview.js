import React from "react";
import ReactMarkdown from "react-markdown";
import { PlayIcon } from "@heroicons/react/solid";
import Award from "../../components/award";
import Quote from "../../components/quote";

const ProjectPreview = ({ entry, widgetFor, widgetsFor }) => {
  const title = entry.getIn(["data", "title"]);
  const type = entry.getIn(["data", "type"]);
  const image = entry.getIn(["data", "image"]);
  const video = entry.getIn(["data", "video"]);
  const body = widgetFor("body");
  const awards = widgetsFor("awards");
  const quotes = widgetsFor("quotes");
  const excerpt = entry.getIn(["data", "excerpt"]);

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
                {video && (
                  <div className="absolute top-1/2 left-1/2 z-20 transform -translate-y-1/2 -translate-x-1/2">
                    <button className="rounded-full group">
                      <PlayIcon className="w-16 h-16 filter drop-shadow-lg text-white transform hover:scale-105 transition-transform ease-in-out duration-fast"/>
                    </button>
                  </div>
                )}
              </div>
              <div className="lg:col-span-6 xl:col-span-7 relative z-10">
                <header className="mb-6">
                  <p className="mb-2 font-semibold tracking-wide text-gray-400">{type}</p>
                  <h1 className="text-4xl md:text-5xl font-bold leading-none">{title}</h1>
                </header>
                <div className="project-content text-lg leading-relaxed text-gray-300">
                  {body}
                </div>
              </div>
            </div>
            {awards.toJS().length > 0 && (
              <section className="mt-8 mb-24 lg:mb-28">
                <ul className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                  {awards.map((award, index) => (
                    <li key={index}>
                      <Award award={award.get("data").toJS()}/>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {quotes.toJS().length > 0 && (
              <div className="grid gap-8 md:grid-cols-2">
                {quotes.map((quote, index) => (
                  <Quote key={index} quote={quote.get("data").toJS()}/>
                ))}
              </div>
            )}
            {excerpt && (
              <section className="my-16 xl:my-20">
                <div className="p-8 sm:p-12 xl:py-24 bg-gray-800 rounded-xl shadow-xl">
                  <div className="max-w-4xl mx-auto prose lg:prose-xl text-gray-300">
                    <ReactMarkdown>{excerpt}</ReactMarkdown>
                  </div>
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
