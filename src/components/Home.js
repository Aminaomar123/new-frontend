import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/equipment/')
      .then((response) => {
        setEquipmentData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleBooking = (id, name) => {
    const formattedName = name.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with hyphens and convert to lowercase
    // navigate(`/booking/${id}/${formattedName}`);
    navigate('/booking');
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );

  return (
    <Container className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <h1 className="text-center mb-4 text-dark">Our Equipment</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {equipmentData.map((equipment) => (
          <Col key={equipment.id}>
            <Card className="equipment-card h-100 shadow rounded-4 border-0" style={{ backgroundColor: '#ffffff' }}>
              {equipment.image && (
                <Card.Img
                  variant="top"
                  src={`http://127.0.0.1:8000${equipment.image}`}
                  alt={equipment.name}
                  className="img-fluid rounded-top"
                  style={{ objectFit: 'cover', height: '200px' }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold text-dark">{equipment.name}</Card.Title>
                <Card.Text className="text-secondary">{equipment.description}</Card.Text>
                <Card.Text className="text-success fw-semibold">
                  Price: TSH/={equipment.price_per_day} per day
                </Card.Text>
                <Button
                  variant="success"
                  className="mt-auto w-100"
                  onClick={() => handleBooking(equipment.id, equipment.name)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
