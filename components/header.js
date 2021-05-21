import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useViewportScroll } from "framer-motion";
import { MailIcon } from "@heroicons/react/solid";
import Logo from "./logo";

function Header() {
  const { scrollY } = useViewportScroll();
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [pointerEvents, setPointerEvents] = useState("auto");
  const opacity = useMotionValue(1);

  useEffect(() => {
    function updatePointerEvents() {
      const threshold = 60;
      if (scrollY.current <= threshold) return setPointerEvents("auto");
      return setPointerEvents("none");
    }

    function updateOpacity() {
      const threshold = 60;
      if (scrollY.current === 0) return opacity.set(1);
      if (scrollY.current > threshold) return opacity.set(0);
      return opacity.set(1 - (scrollY.current / threshold));
    }

    updatePointerEvents();
    updateOpacity();

    const unsubscribePointerEvents = scrollY.onChange(updatePointerEvents);
    const unsubscribeOpacity = scrollY.onChange(updateOpacity);

    return () => {
      unsubscribePointerEvents();
      unsubscribeOpacity();
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-20 transition-opacity ease-out duration-300"
      style={{ opacity, pointerEvents }}
    >
      <header className="py-6">
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
              <nav className="hidden md:block">
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
                      title="Email CJ"
                      className="block hover:opacity-40 transition-opacity ease-out duration-300"
                    >
                      <span className="sr-only">Email CJ</span>
                      <MailIcon className="w-5 h-5"/>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </motion.div>
  );
}

export default Header;
