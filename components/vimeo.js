import React, { useEffect } from "react";
import Vimeo from "@vimeo/player";

function VimeoPlayer({ url }) {
  useEffect(() => {
    new Vimeo(url, {
      url,
      autoplay: true,
      byline: false,
      portrait: false,
      responsive: true,
      title: false
    });
  }, [url]);

  return (
    <div className="flex items-center justify-center h-full">
      <div
        id={url}
        className="flex flex-col justify-center max-w-full max-h-full"
        style={{width: "800px", height: "600px" }}
      />
    </div>
  );
}

export default VimeoPlayer;
