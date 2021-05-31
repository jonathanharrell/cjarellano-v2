import React from "react";
import { PlayIcon } from "@heroicons/react/solid";
import { getCategoryColor } from "../../helpers";
import Quote from "../../components/quote";
import SocialMediaPost from "../../components/social-media-post";

const CategoryPreview = ({ entry, widgetFor, widgetsFor }) => {
  const title = entry.getIn(["data", "title"]);
  const image = entry.getIn(["data", "image"]);
  const body = widgetFor("body");
  const quotes = widgetsFor("quotes");
  const posts = widgetsFor("posts");

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
            <section className="max-w-none prose lg:prose-xl text-gray-400">
              {body}
            </section>
            {quotes.toJS().length > 0 && (
              <section className="my-16 xl:my-20">
                <h2 className="sr-only">Quotes</h2>
                <div className="grid gap-8">
                  {quotes.map((quote, index) => (
                    <Quote key={index} quote={quote.get("data").toJS()} larger={true}/>
                  ))}
                </div>
              </section>
            )}
            {posts.toJS().length > 0 && (
              <section className="my-16 xl:my-20">
                <h2 className="sr-only">Social Media Posts</h2>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                  {posts.map((post, index) => (
                    <SocialMediaPost key={index} post={post.get("data").toJS()}/>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default CategoryPreview;
