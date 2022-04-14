import React from "react";
import Link from "next/link";

const Tag = ({ tag, selected }) => (
    <Link href={selected ? "/blog" : `/blog?tag=${tag}`}>
        <a className={`mr-2 mb-2 py-1 px-2 rounded-full text-sm transition-colors ease-out duration-300 ${selected ? 'bg-gray-50 text-gray-900' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
            <span aria-hidden={true}>#</span>{tag}
        </a>
    </Link>
);

export default Tag;