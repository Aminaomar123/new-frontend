// src/components/EquipmentPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const equipmentList = [
  { id: 1, name: 'Excavator', dailyRate: 500000 },
  { id: 2, name: 'Bulldozer', dailyRate: 500000 },
  { id: 3, name: 'Crane', dailyRate: 1000000 },
];

function EquipmentPage() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [days, setDays] = useState(1);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleProceed = () => {
    if (isAuthenticated) {
      navigate('/booking', { state: { equipment: selectedEquipment, days } });
    } else {
      navigate('/signup-login');
    }
  };

  return (
    <div className="container">
      <h2>Select Equipment</h2>
      <ul className="equipment-list">
        {equipmentList.map((equipment) => (
          <li key={equipment.id}>
            <span>{equipment.name} - Tsh: {equipment.dailyRate}/day</span>
            <button onClick={() => handleSelect(equipment)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedEquipment && (
        <div className="booking-details">
          <h3>Selected Equipment: {selectedEquipment.name}</h3>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
          <button onClick={handleProceed}>Proceed to Booking</button>
        </div>
      )}
    </div>
  );
}

export default EquipmentPage;
