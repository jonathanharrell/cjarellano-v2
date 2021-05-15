import React, { useEffect, useState } from "react";
import Vimeo from "@vimeo/player";
import { Transition } from "@headlessui/react";

function VimeoPlayer({ url }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const videoPlayer = new Vimeo(url, {
      url,
      autoplay: true,
      byline: false,
      portrait: false,
      responsive: true,
      title: false
    });

    videoPlayer.on("loaded", () => setLoaded(true));
  }, [url]);

  return (
    <div className="flex items-center justify-center h-full">
      <Transition
        unmount={false}
        show={loaded}
        enter="transition-opacity ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div
          id={url}
          className="flex flex-col justify-center max-w-full max-h-full"
          style={{ width: "800px", height: "600px" }}
        />
      </Transition>
    </div>
  );
}

export default VimeoPlayer;
