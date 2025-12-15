import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="navbar">
      <div className="logo">
        <img className="logo-img" src={logo} alt="Krypton Logo" /> Krypton
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/3dlab">3D Lab</Link></li>
        <li><Link to="/3danimation">3D Animation</Link></li>
        <li><Link to="/games">Games</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
