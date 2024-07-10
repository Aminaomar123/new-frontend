// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file for styling

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Rental Equipment</Link>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/signup-login" className="nav-link">Sign Up / Login</Link>
          <Link to="/equipment" className="nav-link">Equipment</Link>
          <Link to="/booking" className="nav-link">Booking</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
