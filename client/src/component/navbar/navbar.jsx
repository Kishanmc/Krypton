import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    // Redirect to home or login page after logout
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img className="logo-img" src={logo} alt="Krypton Logo" /> Krypton
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/3dlab">3D Lab</a></li>
        <li><a href="/3danimation">3D Animation</a></li>
        <li><a href="/games">Games</a></li>
        <li><a href="/chat">Chat</a></li>
        {isLoggedIn ? (
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        ) : (
          <li><a href="/login">Login</a></li>
        )}
        <li><a href="/about">About</a></li>
      </ul>

      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
