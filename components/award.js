import React from "react";

const AwardInfo = ({ award }) => (
  <div className="flex flex-col justify-center relative text-center">
    <img src="/img/olive-leaves.svg" alt="" className="opacity-20"/>
    <div className="flex flex-col items-center justify-center absolute inset-0 w-full h-full p-20 lg:p-16 xl:p-20">
      <h3 className="mb-2 xl:text-lg leading-tight font-semibold">
        {award.title}
      </h3>
      <p className="sm:text-sm md:text-base xl:text-lg font-medium text-gray-400">
        {award.source}
      </p>
    </div>
  </div>
);

const Award = ({ award }) => {
  if (award.link) {
    return (
      <a
        href={award.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-full transform hover:scale-105 transition-transform ease-out duration-300"
      >
        <AwardInfo award={award}/>
      </a>
    )
  }

  return (
    <AwardInfo award={award}/>
  )
};

export default Award;
