import React from "react";

const Quote = ({ quote, larger }) => (
  <blockquote className="p-8 xl:p-10 border-4 border-gray-800 rounded-xl">
    <p className={`mb-2 ${larger ? "text-2xl" : "text-xl"} leading-relaxed`}>
      {quote.text}
    </p>
    <cite className="font-medium text-gray-400">
      {quote.source}
    </cite>
  </blockquote>
);

export default Quote;
