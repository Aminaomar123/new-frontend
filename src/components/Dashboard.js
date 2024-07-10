// src/components/Dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import '../App.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
