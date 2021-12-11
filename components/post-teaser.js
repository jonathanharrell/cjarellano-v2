import React from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";

const PostTeaser = ({ post }) => {
    const labelId = `${kebabCase(post.title)}-label`;

    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit"
    });

    return (
        <Link href={`/post/${post.slug}`}>
            <a aria-labelledby={labelId} className="block relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transform lg:hover:scale-110 transition-all ease-out duration-300 group" style={{ padding: "35% 0" }}>
                <figure className="absolute inset-0 w-full h-full">
                    <img src={post.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute bottom-0 z-10 w-full h-3/4 bg-gradient-to-t from-gray-900"/>
                </figure>
                <div className="flex flex-col absolute inset-0 z-10 w-full h-full p-6 pb-8">
                    <p className="mt-auto mb-1 text-sm font-semibold tracking-wide opacity-50">
                        {formattedDate}
                    </p>
                    <h3 id={labelId} className="text-xl leading-tight font-semibold tracking-wide">
                        {post.title}
                    </h3>
                </div>
            </a>
        </Link>
    );
};

export default PostTeaser;
