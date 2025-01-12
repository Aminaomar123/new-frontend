import React, { useState } from 'react';
import './BookingForm.css';

const equipmentOptions = [
  { id: 1, name: 'Leddar' },

  { id: 2, name: 'Neil Gun' },
  { id: 3, name: 'Wheel Barrow' }
];

const mockBookings = [
  {
    id: 1,
    name: 'John Doe',
    selectedEquipment: ['Leddar', 'Wheel Barrow'],
    startDate: '2025-01-15',
    endDate: '2025-01-20'
  },
  {
    id: 2,
    name: 'Jane Smith',
    selectedEquipment: ['Neil Gun'],
    startDate: '2025-02-10',
    endDate: '2025-02-12'
  }
];

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    selectedEquipment: [],
    startDate: '',
    endDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewBookings, setViewBookings] = useState(false); // Toggle between views
  const [bookings, setBookings] = useState(mockBookings); // Set mock bookings

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'selectedEquipment') {
      const updatedEquipment = formData.selectedEquipment.includes(value)
        ? formData.selectedEquipment.filter(item => item !== value) // Unselect the item
        : [...formData.selectedEquipment, value]; // Select the item
      setFormData((prevData) => ({
        ...prevData,
        selectedEquipment: updatedEquipment
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulating adding a booking to the "database"
      const newBooking = {
        id: bookings.length + 1,
        name: formData.name,
        selectedEquipment: formData.selectedEquipment,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      // Add the new booking to the bookings array
      setBookings((prevBookings) => [...prevBookings, newBooking]);

      // Reset the form
      alert('Booking submitted successfully!');
      setFormData({
        name: '',
        selectedEquipment: [],
        startDate: '',
        endDate: '',
      });
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>{viewBookings ? 'Your Bookings' : 'Customer Booking Form'}</h2>
      
      {viewBookings ? (
        <div className="view-bookings">
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul>
              {bookings.map((booking, index) => (
                <li key={index}>
                  <p>Booking ID: {booking.id}</p>
                  <p>Name: {booking.name}</p>
                  <p>Selected Equipment: {booking.selectedEquipment.join(', ')}</p>
                  <p>Start Date: {booking.startDate}</p>
                  <p>End Date: {booking.endDate}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Equipment:</label>
            {equipmentOptions.map((equipment) => (
              <div key={equipment.id} className="equipment-checkbox">
                <input
                  type="checkbox"
                  id={equipment.name}
                  name="selectedEquipment"
                  value={equipment.name}
                  checked={formData.selectedEquipment.includes(equipment.name)}
                  onChange={handleChange}
                />
                <label htmlFor={equipment.name}>{equipment.name}</label>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Booking'}
          </button>
        </form>
      )}

      <button onClick={() => setViewBookings(!viewBookings)}>
        {viewBookings ? 'Go to Booking Form' : 'View Your Bookings'}
      </button>
    </div>
  );
};

export default BookingForm;
