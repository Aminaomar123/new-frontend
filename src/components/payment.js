import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './payment.css';

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    booking: '',
    status: '',
    amount: '',
  });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [currentPayment, setCurrentPayment] = useState(null); // For editing
  const [viewMode, setViewMode] = useState('form'); // 'form' or 'history' or 'edit'

  // Fetch payment history
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/payment/');
        setPaymentHistory(response.data);
      } catch {
        setError('Failed to load payment history.');
      }
    };
    fetchPayments();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPaymentStatus(null);

    try {
      if (currentPayment) {
        // Update existing payment
        await axios.put(
          `http://127.0.0.1:8000/api/payment/${currentPayment.id}/`,
          paymentData
        );
        setPaymentStatus('Payment updated successfully.');
      } else {
        // Create new payment
        await axios.post('http://127.0.0.1:8000/api/payment/', paymentData);
        setPaymentStatus('Payment submitted successfully.');
      }
      setViewMode('history'); // Go back to history view
    } catch {
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a payment
  const handleEdit = (payment) => {
    setCurrentPayment(payment);
    setPaymentData({
      booking: payment.booking,
      status: payment.status,
      amount: payment.amount,
    });
    setViewMode('edit');
  };

  // Toggle view between form and history
  const toggleView = () => {
    setViewMode(viewMode === 'history' ? 'form' : 'history');
    if (viewMode === 'edit') {
      setCurrentPayment(null); // Reset editing state
    }
  };

  return (
    <div className="payment-form-container">
      {viewMode === 'history' ? (
        <div className="payment-history">
          <h2>Payment History</h2>
          {paymentHistory.length === 0 ? (
            <p>No payments found.</p>
          ) : (
            <ul>
              {paymentHistory.map((payment) => (
                <li key={payment.id} className="payment-history-item">
                  <p><strong>Payment ID:</strong> {payment.id}</p>
                  <p><strong>Customer Name:</strong> {payment.name}</p>
                  <p><strong>Equipment Name:</strong> {payment.equipmentName}</p>
                  <p><strong>Booking:</strong> {payment.booking}</p>
                  <p><strong>Amount:</strong> {payment.amount}</p>
                  <p><strong>Status:</strong> {payment.status}</p>
                  <p><strong>Date:</strong> {new Date(payment.paid_on).toLocaleString()}</p>
                  <button onClick={() => handleEdit(payment)} className="edit-button">Edit</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="payment-form">
          <h2>{currentPayment ? 'Edit Payment' : 'New Payment'}</h2>
          {error && <div className="error-message">{error}</div>}
          {paymentStatus && <div className="payment-status">{paymentStatus}</div>}

          <div className="form-group">
            <label>Booking</label>
            <input
              type="text"
              name="booking"
              value={paymentData.booking}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="status"
              value={paymentData.status}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
   
            <input
              type="number"
              name="amount"
              value={paymentData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : currentPayment ? 'Update Payment' : 'Submit Payment'}
          </button>
        </form>
      )}

      <button onClick={toggleView} className="view-history-button">
        {viewMode === 'history' ? 'Create New Payment' : 'View Payment History'}
      </button>
    </div>
  );
};

export default PaymentForm;
