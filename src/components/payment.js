import React, { useState } from 'react';
import './payment.css';

const PaymentForm = () => {
  // State for payment details
  const [paymentData, setPaymentData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  // States for error handling, loading status, and payment status
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // State to store payment history
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);  // Toggle to show payment history

  // Handle input changes for payment form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to simulate payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPaymentStatus(null);

    // Basic validation
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    // Simulating an API call for payment processing
    try {
      const isPaymentSuccessful = Math.random() > 0.2;  // 80% success rate for demo purposes
      if (isPaymentSuccessful) {
        setPaymentStatus('Payment Successful! Thank you for your purchase.');

        // Save successful payment to history
        const newPayment = {
          id: paymentHistory.length + 1,
          name: paymentData.name,
          amount: '$100.00',  // Simulating the amount for demo purposes
          status: 'Success',
          date: new Date().toLocaleString(),
        };

        setPaymentHistory([...paymentHistory, newPayment]);
      } else {
        setPaymentStatus('Payment Failed. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle payment history view
  const toggleHistory = () => {
    setViewHistory(!viewHistory);
  };

  return (
    <div className="payment-form-container">
      <h2>{viewHistory ? 'Payment History' : 'Payment Form'}</h2>

      {viewHistory ? (
        <div className="payment-history">
          {paymentHistory.length === 0 ? (
            <p>No payments made yet.</p>
          ) : (
            <ul>
              {paymentHistory.map((payment, index) => (
                <li key={index} className="payment-history-item">
                  <p><strong>Payment ID:</strong> {payment.id}</p>
                  <p><strong>Customer:</strong> {payment.name}</p>
                  <p><strong>Amount:</strong> {payment.amount}</p>
                  <p><strong>Status:</strong> {payment.status}</p>
                  <p><strong>Date:</strong> {payment.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="payment-form">
          {error && <div className="error-message">{error}</div>}
          {paymentStatus && <div className="payment-status">{paymentStatus}</div>}

          <div className="form-group">
            <label htmlFor="name">Customer Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={paymentData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Equpment Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={paymentData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Amout:</label>
            <input
              type="number"
              id="name"
              name="name"
              value={paymentData.name}
              onChange={handleChange}
              required
            />
          </div>
         

       

       

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing Payment...' : 'Submit Payment'}
          </button>
        </form>
      )}

      <button onClick={toggleHistory} className="view-history-button">
        {viewHistory ? 'Go to Payment Form' : 'View Payment History'}
      </button>
    </div>
  );
};

export default PaymentForm;
