import { useLocation } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Typewriter from 'typewriter-effect';
import { useNavigate} from 'react-router-dom'
function Navbar() {

  
  const context = useContext(noteContext);
  const { mode, toggleMode } = context;
  let location = useLocation();

  let navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  }
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
        <div className="container-fluid">
         
          
          <a className="navbar-brand" href="/">
            
            <Typewriter
  options={{
    strings: ['Welcome to ', 'NoteSaver'],
    autoStart: true,
    loop: true,
  }}
/>
          </a>
          
            {/* <ul className="d-flex ">

            
              <li><a
                className={` d-nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                href="/"
              >
                Home
              </a> </li>
              <li><a                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                href="/about"
              >
                About
              </a>
              </li>
              </ul> */}
          <div className="position-relative">
          <i className="fa-solid fa-moon" onClick={toggleMode}></i>
          {!localStorage.getItem('token') ? 
          <a href="/login" className="d-fixed btn mx-2 btn-primary" role="button">
            Log in
          </a> : <button onClick={handlelogout} className="d-fixed btn mx-2 btn-primary" role="button">
            Log out
          </button>}
          </div>
          
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
