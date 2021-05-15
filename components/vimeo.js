import React, { useEffect, useState } from "react";
import Vimeo from "@vimeo/player";
import { Transition } from "@headlessui/react";

function VimeoPlayer({ url }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const videoPlayer = new Vimeo("player", {
      url,
      autoplay: true,
      byline: false,
      portrait: false,
      responsive: true,
      title: false
    });

    videoPlayer.on("loaded", () => setLoaded(true));

    const handleKeydown = async(event) => {
      if (event.code === "Space") {
        event.preventDefault();

        const paused = await videoPlayer.getPaused();
        if (paused) {
          videoPlayer.play();
        } else {
          videoPlayer.pause();
        }
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [url]);

  return (
    <div className="flex items-center justify-center h-full">
      <Transition
        unmount={false}
        show={loaded}
        enter="transition-opacity ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <div
          id="player"
          className="flex flex-col justify-center w-full h-full"
          style={{ maxWidth: "800px", maxHeight: "600px" }}
        />
      </Transition>
    </div>
  );
}

export default VimeoPlayer;
