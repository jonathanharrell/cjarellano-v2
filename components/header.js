import React from "react";

function Header() {
  return (
    <header className="py-8">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between">
            <a href="" className="font-medium">CJ Arellano</a>
            <nav>
              <ul className="flex">
                <li className="mr-6">
                  <a href="" className="font-medium">Writer</a>
                </li>
                <li className="mr-6">
                  <a href="" className="font-medium">Director</a>
                </li>
                <li className="mr-6">
                  <a href="" className="font-medium">Editor</a>
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
