import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-20 py-6">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between">
            <Link href="/">
              <a className="font-medium">CJ Arellano</a>
            </Link>
            <nav className="hidden md:block">
              <ul className="flex">
                <li className="mr-6">
                  <Link href="/category/writer">
                    <a className="font-medium">Writer</a>
                  </Link>
                </li>
                <li className="mr-6">
                  <Link href="/category/director">
                    <a href="" className="font-medium">Director</a>
                  </Link>
                </li>
                <li className="mr-6">
                  <Link href="/category/editor">
                    <a href="" className="font-medium">Editor</a>
                  </Link>
                </li>
                <li className="mr-6">
                  <a href="" className="font-medium">About</a>
                </li>
                <li>
                  <a href="" className="font-medium">Contact</a>
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
