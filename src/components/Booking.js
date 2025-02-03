import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Spinner, Alert, Modal, Form } from 'react-bootstrap';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    customer: '',
    equipment: '',
  });

  // Fetch all bookings
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/booking/')
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load bookings.');
        setLoading(false);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle create/update submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = selectedBooking
      ? `http://127.0.0.1:8000/api/booking/${selectedBooking.id}/`
      : 'http://127.0.0.1:8000/api/booking/';
    const method = selectedBooking ? 'put' : 'post';

    axios[method](url, formData)
      .then(() => {
        setShowModal(false);
        window.location.reload(); // Refresh to update booking list
      })
      .catch(() => setError('Failed to save booking.'));
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Bookings</h2>
      <Button onClick={() => setShowModal(true)} variant="primary" className="mb-3">
        Add Booking
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Customer</th>
            <th>Equipment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.start_date}</td>
              <td>{booking.end_date}</td>
              <td>{booking.customer}</td>
              <td>{booking.equipment}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setFormData(booking);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBooking ? 'Edit Booking' : 'Add Booking'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                type="number"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Equipment ID</Form.Label>
              <Form.Control
                type="number"
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Bookings;
