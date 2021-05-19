import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function ProjectTeaser({ project }) {
  return (
    <Link href={`/project/${project.slug}`}>
      <a className="block relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transform lg:hover:scale-110 transition-all ease-out duration-300 group" style={{ padding: "35% 0" }}>
        <motion.figure layoutId={`project-image-${project.slug}`} initial={false} className="absolute inset-0 w-full h-full">
          <img src={project.image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute bottom-0 z-10 w-full h-3/4 bg-gradient-to-t from-gray-900"/>
        </motion.figure>
        <div className="flex flex-col absolute inset-0 z-10 w-full h-full p-6 pb-8">
          <p className="mt-auto mb-1 text-sm font-semibold tracking-wide opacity-50">
            {project.type}
          </p>
          <h2 className="text-xl leading-tight font-semibold tracking-wide">
            {project.title}
          </h2>
        </div>
      </a>
    </Link>
  );
}

export default ProjectTeaser;
