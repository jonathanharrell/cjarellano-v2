import React from "react";
import Link from "next/link";
import { MailIcon } from "@heroicons/react/solid";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-20 py-6">
      <div className="container">
        <div className="max-w-8xl mx-auto">
          <div className="flex justify-between">
            <Link href="/">
              <a className="font-semibold">CJ Arellano</a>
            </Link>
            <nav className="hidden md:block">
              <ul className="flex">
                <li className="mr-8">
                  <Link href="/category/writer">
                    <a className="font-semibold">Writer</a>
                  </Link>
                </li>
                <li className="mr-8">
                  <Link href="/category/director">
                    <a href="" className="font-semibold">Director</a>
                  </Link>
                </li>
                <li className="mr-8">
                  <Link href="/category/editor">
                    <a href="" className="font-semibold">Editor</a>
                  </Link>
                </li>
                <li className="mr-8">
                  <a href="" className="font-semibold">About</a>
                </li>
                <li>
                  <a
                    href="mailto:cj@cjarellano.com"
                    title="Email CJ"
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
