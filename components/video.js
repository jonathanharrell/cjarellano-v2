import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlayIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import VimeoPlayer from "./vimeo";
import YoutubePlayer from "./youtube";

const VideoPlayer = ({ isOpen, setIsOpen, url }) => (
  <Transition show={isOpen}>
    <Dialog
      onClose={() => setIsOpen(false)}
      className="flex flex-col fixed inset-0 h-screen z-20 bg-gray-900 text-white"
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
        <Dialog.Overlay/>
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
        <div className="flex flex-col flex-1">
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
          <div className="flex-1 min-h-0">
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
      {PlayButton && <PlayButton isOpen={isOpen} setIsOpen={setIsOpen}/>}
      <VideoPlayer isOpen={isOpen} setIsOpen={setIsOpen} url={url}/>
    </>
  );
}

export default Video;
