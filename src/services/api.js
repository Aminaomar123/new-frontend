// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Exporting all functions
export const getEquipment = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/equipment`);
    return response.data;
  } catch (error) {
    throw new Error('Fetching equipment failed');
  }
};

export const bookEquipment = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/booking`, bookingData);
    return response.data;
  } catch (error) {
    throw new Error('Booking failed');
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const makePayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payment`, paymentData);
    return response.data;
  } catch (error) {
    throw new Error('Payment failed');
  }
};

export const registerUser = async (registrationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, registrationData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};
