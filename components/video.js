import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { PlayIcon } from "@heroicons/react/solid";
import VimeoPlayer from "./vimeo";
import YoutubePlayer from "./youtube";

function Video({ url }) {
  if (!url) throw new Error("Element does not contain a url url!");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="rounded-full group"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Play video</span>
        <PlayIcon className="w-16 h-16 filter drop-shadow-lg text-white"/>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex flex-col fixed inset-0 h-screen z-20 bg-gray-900 text-white"
      >
        <Dialog.Overlay/>
        <header>
          <Dialog.Title className="sr-only">Video player</Dialog.Title>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </header>
        <div className="flex-1 min-h-0">
          {url.includes("vimeo") && <VimeoPlayer url={url}/>}
          {url.includes("youtube") && <YoutubePlayer url={url}/>}
        </div>
      </Dialog>
    </>
  );

  return null;
}

export default Video;
