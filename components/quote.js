import React from "react";

function Quote({ quote }) {
  return (
    <blockquote className="p-8 xl:p-10 border-4 border-gray-800 rounded-xl">
      <p className="mb-2 text-xl leading-relaxed">
        {quote.text}
      </p>
      <cite className="font-medium text-gray-500">
        {quote.source}
      </cite>
    </blockquote>
  )
}

export default Quote;
