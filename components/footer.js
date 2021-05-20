import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "react-feather";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12">
      <div className="container">
        <div className="sm:flex items-center justify-between max-w-8xl mx-auto text-center text-gray-500">
          <p className="font-medium">© {year} CJ Arellano</p>
          <ul className="flex items-center justify-center mt-4 sm:mt-0 space-x-4">
            <li className="p-2">
              <a
                href="http://www.facebook.com/cjlucasarellano"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors ease-out duration-300"
              >
                <span className="sr-only">Facebook</span>
                <Facebook/>
              </a>
            </li>
            <li className="p-2">
              <a
                href="http://www.twitter.com/cjarellano"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors ease-out duration-300"
              >
                <span className="sr-only">Twitter</span>
                <Twitter/>
              </a>
            </li>
            <li className="p-2">
              <a
                href="http://www.instagram.com/cjlucasarellano"
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
                href="http://www.linkedin.com/pub/c-j-arellano/8b/a12/5b3"
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
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
