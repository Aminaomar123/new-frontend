import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Spinner, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    duration: ''
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/equipment/${id}/`)
      .then(response => {
        setEquipment(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load equipment details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://127.0.0.1:8000/api/bookings/`, {
      equipment_id: id,
      ...formData
    })
    .then(() => navigate('/payment'))
    .catch(() => setError('Failed to complete booking.'));
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Book {equipment?.name}</h2>
      <Card className="p-4 shadow">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Booking Date</Form.Label>
            <Form.Control 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duration (days)</Form.Label>
            <Form.Control 
              type="number" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            Confirm Booking
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Booking;
