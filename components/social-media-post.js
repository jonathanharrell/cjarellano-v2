import React, { useState, useEffect } from "react";

const SocialMediaPost = ({ post }) => {
  const regex = /http(s?):\/\/(www.)?(.*).com/;
  const [,,,provider] = post.url.match(regex);

  if (provider === "facebook") {
    return <div className="fb-post" data-href={post.url} data-skin="dark"/>
  }

  const [data, setData] = useState(null);

  useEffect(async() => {
    if (provider === "twitter") {
      try {
        const response = await fetch(`/api/${provider}?url=${post.url}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [provider]);

  return data ? (
    <div dangerouslySetInnerHTML={{ __html: data.html }}/>
  ) : null;
};

export default SocialMediaPost;
