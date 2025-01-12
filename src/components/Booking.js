import React from 'react';
import BookingForm from './BookingForm'; // Import the BookingForm component

const Booking = () => {
  return (
    <div className="booking-container">
      <h2>Book Your Equipment</h2>
      <BookingForm /> {/* Render the BookingForm */}
    </div>
  );
};

export default Booking;
