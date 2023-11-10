import React from "react";
import {Instagram, Linkedin, Mail, Youtube} from "react-feather";
import Link from "next/link";

const Footer = ({ isPrivate }) => {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="py-12">
      <div className="container">
        <div className="sm:flex items-center justify-between max-w-8xl mx-auto text-center sm:text-left text-gray-400">
          <div className="lg:flex items-center">
            <p className="font-medium">© {year} C.J. Arellano</p>
            {!isPrivate && (
              <nav aria-label="Site Navigation" className="mt-4 sm:mt-2 lg:mt-0 lg:ml-16">
                <ul className="flex items-center justify-center space-x-6">
                  <li>
                    <Link href="/" rel="home">
                      <a className="hover:text-gray-300 transition-colors ease-out duration-300">Home</a>
                    </Link>
                  </li>
                  <li className="hover:text-gray-300 transition-colors ease-out duration-300">
                    <Link href="/blog">
                      <a>Blog</a>
                    </Link>
                  </li>
                  <li className="hover:text-gray-300 transition-colors ease-out duration-300">
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
          <ul aria-label="Social Links" className="flex items-center justify-center mt-4 sm:mt-0 space-x-4">
            <li className="p-2">
              <a
                href="https://www.instagram.com/cjlgva"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors ease-out duration-300"
              >
                <span className="sr-only">Instagram</span>
                <Instagram/>
              </a>
            </li>
            <li className="p-2">
              <a
                href="https://www.linkedin.com/in/c-j-arellano-133a88269"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors ease-out duration-300"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin/>
              </a>
            </li>
            <li className="p-2">
              <a
                href="https://www.youtube.com/channel/UC4xrh0L-AuABKRJAX_LNyVg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors ease-out duration-300"
              >
                <span className="sr-only">YouTube</span>
                <Youtube/>
              </a>
            </li>
            <li className="p-2">
              <Link href="/contact">
                <a className="hover:text-gray-300 transition-colors ease-out duration-300">
                  <span className="sr-only">Contact</span>
                  <Mail/>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
