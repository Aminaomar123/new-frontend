import React, { useState } from 'react';
import './BookingForm.css';

// Example equipment options
const equipmentOptions = [
  { id: 1, name: 'Tractor' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Drone' }
];

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedEquipment: [],
    startDate: '',
    endDate: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Construct the booking data (you can format the data if needed before sending it)
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        selectedEquipment: formData.selectedEquipment,
        startDate: formData.startDate,
        endDate: formData.endDate,
        notes: formData.notes
      };

      // Make a POST request to your backend API to save the data into the database
      const response = await fetch('http://yourapiurl.com/api/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData), // Convert the form data to a JSON string
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }

      // If successful, alert the user and reset the form
      alert('Booking submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        selectedEquipment: [],
        startDate: '',
        endDate: '',
        notes: ''
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Customer Booking Form</h2>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
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

        <div className="form-group">
          <label htmlFor="notes">Additional Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
