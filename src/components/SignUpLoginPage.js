// src/components/SignUpLoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function SignUpLoginPage() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [formData, setFormData] = useState({
    username: '', // Added username for both login and signup
    password: '',
    confirmPassword: '', // Added confirmPassword for password confirmation
    address: '',
    idNumber: ''
  });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidIDNumber = (idNumber) => {
    // Numeric-only validation for ZANID or NIDA Number
    const numericPattern = /^\d+$/; // Numeric check
    return numericPattern.test(idNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isRegistered) {
      const user = users.find(user => user.username === formData.username);
      if (user && user.password === formData.password) {
        login();
        navigate('/equipment');
      } else {
        setMessage('Incorrect username or password.');
      }
    } else {
      const userExists = users.some(user => user.username === formData.username);
      if (userExists) {
        setMessage('Username already registered.');
      } else if (!isValidIDNumber(formData.idNumber)) {
        setMessage('Invalid ID number. Enter a numeric ZANID or NIDA number.');
      } else if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match. Please re-enter your password.');
      } else {
        users.push({
          username: formData.username,
          password: formData.password,
          idNumber: formData.idNumber,
          address: formData.address
        });
        localStorage.setItem('users', JSON.stringify(users));
        login();
        navigate('/equipment');
      }
    }
  };

  return (
    <div className="container">
      <h2>{isRegistered ? 'Login' : 'Sign Up'}</h2>
      <form className="form" onSubmit={handleSubmit}>
        {!isRegistered && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="idNumber"
              placeholder="ID Number (Numeric only)"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              onChange={handleChange}
              required
            />
          </>
        )}
        {isRegistered && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">{isRegistered ? 'Login' : 'Sign Up'}</button>
      </form>
      {message && <p className="message">{message}</p>}
      <button className="toggle-button" onClick={() => setIsRegistered(!isRegistered)}>
        {isRegistered ? 'Sign Up' : 'Login'}
      </button>
    </div>
  );
}

export default SignUpLoginPage;
