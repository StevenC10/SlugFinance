import React from "react";
import Logo from "../images/test2.png"
import {useNavigate} from 'react-router-dom';
// from mamba ui

function toLogin() {
  window.location.replace("http://localhost:3000/login");
}

function toSignup() {
  window.location.replace("http://localhost:3000/signup");
}

function toPortfolio() {
  window.location.replace("http://localhost:3000/portfolio")
}

console.log('wha');
const Navbar = () => {
  const history = useNavigate();
  const toLogout = () => {
    localStorage.removeItem('user');
    history('/');
  };
  
  return (
      <header className="sticky top-0 sm:px-12 mx-auto flex items-center p-4 bg-blue-600 bg-opacity-0">
        <div className="container flex justify-between h-10 mx-auto">
          <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2 mx-0">
            <img src={Logo} className="w-12 h-12" alt="logo" />
            <div className="text-xl flex flex-col font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-200">
              SLUG FINANCE 
            </div>
          </a>
          <div className="items-center space-x-2 flex-shrink-0 hidden lg:flex">
            <li className="flex">
              {/* <a rel="noopener noreferrer" href="/" className="flex items-center text-lg px-4 font-bold -mb-1 text-yellow-300">myPortfolio</a> */}
              {localStorage.getItem('user') !== null ? <button type="button" className="px-8 py-3 font-semibold rounded-full bg-gray-500 text-gray-800" onClick={toPortfolio}>myPortfolio</button> : null}
            </li>
            {localStorage.getItem('user') !== null ? <button className="self-center px-8 py-3 rounded text-gray-200 bg-red-600 hover:bg-red-700 font-semibold active:bg-red-800" onClick={toLogout}>Log Out</button> : null}
            {localStorage.getItem('user') === null ? <button className="self-center px-8 py-3 rounded text-gray-200 bg-blue-600 hover:bg-blue-700 font-semibold active:bg-blue-800" onClick={toSignup}>Sign up</button> : null}
            {localStorage.getItem('user') === null ? <button className="self-center px-8 py-3 rounded text-gray-200 bg-gray-600 hover:bg-gray-700 font-semibold active:bg-gray-800" onClick={toLogin}>Log in</button> : null}
          </div>
        </div>
      </header>
  );
};
  
export default Navbar;