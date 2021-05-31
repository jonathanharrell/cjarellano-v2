import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Vimeo from "@vimeo/player";
import Logo from "./logo";
import YouTube from "react-youtube";

const VimeoPlayer = ({ url }) => {
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

    videoPlayer.on("play", () => setLoaded(true));

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
      {!loaded && <Logo className="w-20 h-20 mr-4 logo-animating"/>}
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
};

const YoutubePlayer = ({ url }) => {
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
      {!loaded && <Logo className="w-20 h-20 mr-4 logo-animating"/>}
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
};

const VideoPlayer = ({ isOpen, setIsOpen, url }) => (
  <Transition show={isOpen} className="inline">
    <Dialog
      onClose={() => setIsOpen(false)}
    >
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 w-screen h-screen"/>
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex flex-col fixed inset-0 w-screen h-screen z-20 bg-gray-900 text-white">
          <header className="flex items-center justify-between p-6">
            <Dialog.Title className="sr-only">Video player</Dialog.Title>
            <button
              className="ml-auto group"
              title="Close video player"
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="w-10 h-10 text-gray-600 group-hover:text-gray-400 transition-colors ease-in-out duration-fast"/>
              <span className="sr-only">Close video player</span>
            </button>
          </header>
          <div className="flex-1 min-h-0 pb-24 sm:pb-0">
            {url.includes("vimeo") && <VimeoPlayer url={url}/>}
            {url.includes("youtube") && <YoutubePlayer url={url}/>}
          </div>
        </div>
      </Transition.Child>
    </Dialog>
  </Transition>
);

function Video({ url, PlayButton }) {
  if (!url) throw new Error("Element does not contain a url url!");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {PlayButton && (
        <PlayButton isOpen={isOpen} setIsOpen={setIsOpen}/>
      )}
      <VideoPlayer isOpen={isOpen} setIsOpen={setIsOpen} url={url}/>
    </>
  );
}

export default Video;
