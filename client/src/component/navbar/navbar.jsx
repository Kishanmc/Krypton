import React, { useState } from "react";
import "./navbar.css";
import logo from "../assets/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
<div className="logo">        <img classname="logo-img" src={logo} alt="" srcset="" /> Krypton</div>

      {/* Merged all links inside one container */}
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/3dlab">3D Lab</a></li>
        <li><a href="/3danimation">3D Animation</a></li>
        <li><a href="/games">Games</a></li>
        <li><a href="/chat">Chat</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/about">About</a></li>
      </ul>

      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
