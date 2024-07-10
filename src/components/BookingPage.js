import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEquipment, bookEquipment } from '../services/api';
import '../App.css';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { equipment, days } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('mobile');
  const [token, setToken] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); // Track payment success

  const totalAmount = equipment ? equipment.dailyRate * days : 0;

  const handlePayment = () => {
    if (paymentMethod === 'mobile' && !token) {
      setErrorMessage('Please enter your mobile payment token.');
      return;
    }
    if (paymentMethod === 'bank' && !controlNumber) {
      setErrorMessage('Please enter your bank control number.');
      return;
    }

    // Simulate payment success for demonstration purposes
    // Replace this with your actual payment processing logic
    setTimeout(() => {
      setPaymentSuccessful(true);
      const bookingData = {
        user: { id: 1 }, // Replace with actual user ID from login
        equipment: { id: equipment.id },
        days: days,
        totalAmount: totalAmount,
        bookingDate: new Date().toISOString().split('T')[0]
      };

      bookEquipment(bookingData)
        .then(response => {
          console.log('Booking successful:', response);
        })
        .catch(error => {
          console.error('Booking failed:', error);
        });
    }, 1500);
  };

  const handleProceedBooking = () => {
    navigate('/equipment');
  };

  const handleLogout = () => {
    localStorage.removeItem('users'); // Clear user session data
    navigate('/signup-login');
  };

  useEffect(() => {
    getEquipment()
      .then(equipment => {
        console.log('Equipment loaded:', equipment);
        // Handle equipment data
      })
      .catch(error => {
        console.error('Failed to load equipment:', error);
      });
  }, []);

  if (!equipment) {
    return <p>No equipment selected. Go back to select equipment.</p>;
  }

  return (
    <div className="container">
      <h2>Booking Details</h2>
      <p>Equipment: {equipment.name}</p>
      <p>Days: {days}</p>
      <p>Total Amount: Tsh: {totalAmount}</p>
      {!paymentSuccessful && (
        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          <label>
            <input
              type="radio"
              name="payment"
              value="mobile"
              checked={paymentMethod === 'mobile'}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setErrorMessage('');
              }}
            />
            Mobile Payment
          </label>
          {paymentMethod === 'mobile' && (
            <input
              type="text"
              placeholder="Enter Pay Bill Number"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          )}
          <label>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setErrorMessage('');
              }}
            />
            Bank Transaction
          </label>
          {paymentMethod === 'bank' && (
            <input
              type="text"
              placeholder="Enter bank control number"
              value={controlNumber}
              onChange={(e) => setControlNumber(e.target.value)}
            />
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="payment-button" onClick={handlePayment}>
            Make Payment
          </button>
        </div>
      )}
      {paymentSuccessful && (
        <div className="payment-success">
          <p className="success-message">Payment Successful!</p>
          <div className="actions">
            <button className="proceed-button" onClick={handleProceedBooking}>
              Proceed to Equipment Selection
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
