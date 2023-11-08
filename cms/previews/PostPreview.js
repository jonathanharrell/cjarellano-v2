import React from "react";

const PostPreview = ({ entry, widgetFor }) => {
  const title = entry.getIn(["data", "title"]);
  const body = widgetFor("body");

  return (
    <div className="min-h-screen p-16 bg-gray-900 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-none">{title}</h1>
            </header>
            <section className="max-w-none prose lg:prose-xl text-gray-300">
              {body}
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
