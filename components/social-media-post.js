import React, { useState, useEffect } from "react";
import { Twitter } from "react-feather";

function SocialMediaPost({ post }) {
  const [data, setData] = useState(null);

  useEffect(async() => {
    if (post.url.includes("twitter")) {
      try {
        const response = await fetch(`/api/twitter?url=${post.url}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (post.url.includes("facebook")) {
      try {
        const response = await fetch(`/api/facebook?url=${post.url}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [post])

  return data ? (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-8 sm:p-12 sm:pr-14 bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transform lg:hover:scale-105 transition-all ease-out duration-300 group"
    >
      <Twitter className="-mt-2 sm:-mt-6 -mr-2 sm:-mr-6 mb-2 ml-auto text-gray-500"/>
      <div dangerouslySetInnerHTML={{ __html: data.html }}/>
    </a>
  ) : null;
}

export default SocialMediaPost;
