import React from "react";
import Logo from "../images/test2.png"
// from mamba ui

function toLogin() {
  window.location.replace("http://localhost:3000/login");
}

function toSignup() {
  window.location.replace("http://localhost:3000/signup");
}

const Navbar = () => {
  return (
    // dark:bg-gray-800 dark:text-gray-100
      <header className="sticky top-0 sm:px-12 mx-auto flex items-center p-4 bg-blue-600 bg-opacity-70">
        <div className="container flex justify-between h-10 mx-auto">
          <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2 mx-0">
            <img src={Logo} className="w-12 h-12" alt="logo" />
            <div className="text-sm flex flex-col font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-300">
              SLUG FINANCE 
            </div>
          </a>
          {/* <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400">Link</a>
            </li>
            <li className="flex">
              <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Link</a>
            </li>
            <li className="flex">
              <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Link</a>
            </li>
            <li className="flex">
              <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Link</a>
            </li>
          </ul> */}
          <div className="items-center space-x-2 flex-shrink-0 hidden lg:flex">
            <li className="flex">
              <a rel="noopener noreferrer" href="/" className="flex items-center text-lg px-4 -mb-1 text-gray-200">myPortfolio</a>
            </li>
            <button className="self-center px-8 py-3 rounded text-gray-200 bg-blue-500 hover:bg-blue-600 font-semibold active:bg-blue-700" onClick={toSignup}>Sign up</button>
            <button className="self-center px-8 py-3 rounded text-gray-200 bg-gray-500 hover:bg-gray-600 font-semibold active:bg-gray-700" onClick={toLogin}>Log in</button>
          </div>
        </div>
      </header>
  );
};
  
export default Navbar;