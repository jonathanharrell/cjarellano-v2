import React, { useState, useEffect } from "react";

function SocialMediaPost({ post }) {
  const [html, setHtml] = useState(null);

  useEffect(async() => {
    try {
      const response = await fetch(`/api/twitter?url=${post.url}`);
      const { html } = await response.json();
      setHtml(html);

      if (window.twttr) window.twttr.widgets.load();
    } catch (error) {
      console.error(error);
    }
  }, [post])

  return (
    <div className="h-full">
      <div dangerouslySetInnerHTML={{ __html: html }} className="h-full"/>
    </div>
  );
}

export default SocialMediaPost;
