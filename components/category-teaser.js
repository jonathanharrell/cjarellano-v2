import React from "react";

function CategoryTeaser({ category }) {
  return (
    <a href={`/category/${category.slug}`} className="block relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transform lg:hover:scale-110 transition-all ease-out duration-300 group" style={{ padding: "35% 0" }}>
      <figure className="absolute inset-0 w-full h-full">
        <img src={category.image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute bottom-0 z-10 w-full h-3/4 bg-gradient-to-t from-gray-900"/>
      </figure>
      <div className="flex items-center justify-center absolute inset-0 z-10 w-full h-full p-6 pb-8">
        <h2 className="text-xl leading-tight font-semibold tracking-wide capitalize">
          {category.action}
        </h2>
      </div>
    </a>
  );
}

export default CategoryTeaser;
