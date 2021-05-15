import React, { useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import YouTube from "react-youtube";

function YoutubePlayer({ url }) {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const player = useRef(null);

  const ytRegex = "https://(?:www\\.youtube\\.com/watch\\?v=|youtu\\.be/)([\\w-]{11})";
  const [, videoId] = url.match(ytRegex);

  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0
    }
  };

  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === "Space") {
        event.preventDefault();

        if (player.current) {
          if (playing) {
            player.current.internalPlayer.pauseVideo();
          } else {
            player.current.internalPlayer.playVideo();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [playing]);

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
          className="flex flex-col justify-center max-w-full max-h-full"
          style={{ width: "800px", height: "600px" }}
        >
          <YouTube
            ref={player}
            videoId={videoId}
            opts={opts}
            onReady={() => setLoaded(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </div>
      </Transition>
    </div>
  );
}

export default YoutubePlayer;
