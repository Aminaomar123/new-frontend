// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import SignUpLoginPage from './components/SignUpLoginPage';
import EquipmentPage from './components/EquipmentPage';
import BookingPage from './components/BookingPage';
import ProtectedRoute from './guards/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<HomePage />} />
            <Route path="signup-login" element={<SignUpLoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="equipment" element={<EquipmentPage />} />
              <Route path="booking" element={<BookingPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
