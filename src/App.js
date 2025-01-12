// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';  // Home component with equipment
import Booking from './components/Booking'; // Booking component to show the booking form
import Payment from './components/payment'
const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default route for home */}
          <Route path="/home" element={<Home />} /> {/* Explicit route for home */}
          <Route path="/booking" element={<Booking />} /> {/* Route for booking */}
          <Route path="/payment" element={<Payment />} /> {/* Route for booking */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
