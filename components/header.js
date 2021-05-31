import React, { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useMotionValue, useViewportScroll } from "framer-motion";
import { Transition, Dialog } from "@headlessui/react";
import { MailIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import Logo from "./logo";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <div className="md:hidden">
      <button
        className="py-1 px-4 rounded-full border-2 border-white hover:bg-white font-semibold tracking-wide text-white hover:text-gray-900 transform hover:scale-105 transition-all ease-out duration-fast"
        aria-label="Open site menu"
        onClick={() => setIsOpen(true)}
      >
        Menu
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="container md:hidden fixed inset-0 z-20 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70"/>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="relative my-6 rounded-xl bg-gray-800 shadow-xl transition-all transform">
              <header className="flex items-center justify-between p-4">
                <Dialog.Title className="sr-only">Site Menu</Dialog.Title>
                <button
                  className="ml-auto group"
                  title="Close menu"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="w-8 h-8 text-gray-600 group-hover:text-gray-400 transition-colors ease-in-out duration-fast"/>
                  <span className="sr-only">Close menu</span>
                </button>
              </header>
              <nav aria-label="Site Navigation" className="pb-8">
                <ul>
                  <li>
                    <Link href="/" rel="home">
                      <a className="block py-3 px-8 hover:bg-gray-700 text-2xl font-semibold transition-colors ease-in-out duration-fast">Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/writer">
                      <a className="block py-3 px-8 hover:bg-gray-700 text-2xl font-semibold transition-colors ease-in-out duration-fast">Writer</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/director">
                      <a className="block py-3 px-8 hover:bg-gray-700 text-2xl font-semibold transition-colors ease-in-out duration-fast">Director</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/editor">
                      <a className="block py-3 px-8 hover:bg-gray-700 text-2xl font-semibold transition-colors ease-in-out duration-fast">Editor</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a className="block py-3 px-8 hover:bg-gray-700 text-2xl font-semibold transition-colors ease-in-out duration-fast">About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="mailto:cj@cjarellano.com">
                      <a className="block py-3 px-8 hover:bg-gray-700 text-2xl font-semibold transition-colors ease-in-out duration-fast">Contact</a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

const Header = () => {
  const { scrollY } = useViewportScroll();
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [pointerEvents, setPointerEvents] = useState("auto");
  const opacity = useMotionValue(1);
  const router = useRouter();

  useEffect(() => {
    const updatePointerEvents = () => {
      const threshold = 60;
      if (scrollY.current <= threshold) return setPointerEvents("auto");
      return setPointerEvents("none");
    };

    const updateOpacity = () => {
      const threshold = 60;
      if (scrollY.current === 0) return opacity.set(1);
      if (scrollY.current > threshold) return opacity.set(0);
      return opacity.set(1 - (scrollY.current / threshold));
    };

    updatePointerEvents();
    updateOpacity();

    const unsubscribePointerEvents = scrollY.onChange(updatePointerEvents);
    const unsubscribeOpacity = scrollY.onChange(updateOpacity);

    const handleRouteChange = () => {
      setLogoAnimating(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      unsubscribePointerEvents();
      unsubscribeOpacity();
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-20 transition-opacity ease-out duration-300"
      style={{ opacity, pointerEvents }}
    >
      <header aria-label="Site Header" className="py-6">
        <div className="container">
          <div className="max-w-8xl mx-auto">
            <div className="flex items-center justify-between">
              <Link href="/">
                <a
                  className="flex items-center font-semibold tracking-wide"
                  onMouseOver={() => setLogoAnimating(true)}
                  onMouseOut={() => setLogoAnimating(false)}
                >
                  <Logo className={`w-10 h-10 mr-4${logoAnimating ? " logo-animating" : ""}`}/>
                  <span>C.J. Arellano</span>
                </a>
              </Link>
              <nav aria-label="Site Navigation" className="hidden md:block">
                <ul className="flex">
                  <li className="mr-8">
                    <Link href="/category/writer">
                      <a className="nav-link font-semibold tracking-wide hover:text-magenta">Writer</a>
                    </Link>
                  </li>
                  <li className="mr-8">
                    <Link href="/category/director">
                      <a className="nav-link font-semibold tracking-wide hover:text-cyan">Director</a>
                    </Link>
                  </li>
                  <li className="mr-8">
                    <Link href="/category/editor">
                      <a className="nav-link font-semibold tracking-wide hover:text-yellow">Editor</a>
                    </Link>
                  </li>
                  <li className="mr-8">
                    <Link href="/about">
                      <a className="nav-link font-semibold tracking-wide">About</a>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <a
                      href="mailto:cj@cjarellano.com"
                      title="Email C.J."
                      className="block hover:opacity-40 transition-opacity ease-out duration-300"
                    >
                      <span className="sr-only">Email C.J.</span>
                      <MailIcon className="w-5 h-5"/>
                    </a>
                  </li>
                </ul>
              </nav>
              <MobileMenu/>
            </div>
          </div>
        </div>
      </header>
    </motion.div>
  );
};

export default Header;
