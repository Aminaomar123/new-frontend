import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import './payment.css'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Building Equipment Rental Services</div>
      <nav className="nav-links">
        <Link to="/home" className="nav-link">Home</Link> {/* Link to the Home page */}
        <Link to="/booking" className="nav-link">Booking</Link> {/* Link to the Booking page */}
        <Link to="/payment" className="nav-link">Payment</Link> {/* Link to the Booking page */}
        
      </nav>
    </header>
  );
};

export default Header;
