import React from "react";

function ProjectTeaser({ project }) {
  return (
    <a href={`/project/${project.slug}`} className="block relative shadow hover:shadow-xl transform lg:hover:scale-110 transition-all ease-out duration-300 group" style={{ padding: "35% 0" }}>
      <figure className="absolute inset-0 w-full h-full overflow-hidden rounded-lg">
        <img src={project.image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute bottom-0 z-10 w-full h-3/4 bg-gradient-to-t from-gray-900 group-hover:opacity-0 transition-opacity ease-out duration-300"/>
        <div className="absolute bottom-0 z-10 w-full h-full bg-gradient-to-t from-gray-900 opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-300"/>
      </figure>
      <div className="flex flex-col absolute inset-0 z-10 w-full h-full p-6 pb-8">
        <p className="mt-auto mb-1 text-sm font-semibold tracking-wide opacity-50">
          {project.type}
        </p>
        <h2 className="text-xl leading-tight font-semibold tracking-wide">
          {project.title}
        </h2>
      </div>
    </a>
  );
}

export default ProjectTeaser;
