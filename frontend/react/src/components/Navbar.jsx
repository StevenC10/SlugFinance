import React from 'react'
import {FaFacebookSquare,FaSistrix, FaBars, FaTwitterSquare,FaPinterestSquare} from "react-icons/fa"
import { ReactComponent as Logo} from '../logo.svg'
export default function Navbar({setSymbol,setStock}) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    //const handleInput=()=>
    return (
      <>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-[#27a5f8] mb-3">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <Logo width="40" height="40"/>
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <a
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                href="#pablo"
              >
                SLUG FINANCE 
              </a>
              
              <button
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i><FaBars/></i>
              </button>
            </div>
            <div>
            <form style={{background:'white', margin:'2px'}} >
              <input placeholder="TSLA, AAPL, NVDA..."/>
              <button type="submit" >
                <FaSistrix/>
              </button>
            </form>
            </div>
            

            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <FaFacebookSquare/>
                    <i className="fab text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Share</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="text-lg leading-lg text-white opacity-75"><FaTwitterSquare/></i><span className="ml-2">Tweet</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="text-lg leading-lg text-white opacity-75"><FaPinterestSquare/></i><span className="ml-2">Pin</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }