import React, { useState, useEffect } from "react";
import { Facebook, Twitter } from "react-feather";

function SocialMediaPost({ post }) {
  const [data, setData] = useState(null);

  useEffect(async() => {
    const regex = /http(s?):\/\/(www.)?(.*).com/;
    const [,,,provider] = post.url.match(regex);

    try {
      const response = await fetch(`/api/${provider}?url=${post.url}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }, [post])

  return data ? (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-8 sm:p-12 sm:pr-14 bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transform lg:hover:scale-105 transition-all ease-out duration-300 group"
    >
      {data.provider_name === "Twitter" && <Twitter className="-mt-2 sm:-mt-6 -mr-2 sm:-mr-6 mb-2 ml-auto text-gray-500"/>}
      {data.provider_name === "Facebook" && <Facebook className="-mt-2 sm:-mt-6 -mr-2 sm:-mr-6 mb-2 ml-auto text-gray-500"/>}
      <div dangerouslySetInnerHTML={{ __html: data.html }}/>
    </a>
  ) : null;
}

export default SocialMediaPost;
