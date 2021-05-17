import React from "react";
import Link from "next/link";
import { MailIcon } from "@heroicons/react/solid";
import Logo from "./logo";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-20 py-6">
      <div className="container">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center font-semibold tracking-wide">
                <Logo className="w-10 h-10 mr-4"/>
                <span>CJ Arellano</span>
              </a>
            </Link>
            <nav className="hidden md:block">
              <ul className="flex">
                <li className="mr-8">
                  <Link href="/category/writer">
                    <a className="font-semibold tracking-wide">Writer</a>
                  </Link>
                </li>
                <li className="mr-8">
                  <Link href="/category/director">
                    <a href="" className="font-semibold tracking-wide">Director</a>
                  </Link>
                </li>
                <li className="mr-8">
                  <Link href="/category/editor">
                    <a href="" className="font-semibold tracking-wide">Editor</a>
                  </Link>
                </li>
                <li className="mr-8">
                  <Link href="/about">
                    <a href="" className="font-semibold tracking-wide">About</a>
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:cj@cjarellano.com"
                    title="Email CJ"
                    className="block"
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
  );
}

export default Header;
