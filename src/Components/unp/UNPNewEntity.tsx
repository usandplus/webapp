import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  InputGroup
} from 'react-bootstrap';
import { BiUser, BiEnvelope, BiPhone, BiBuilding } from 'react-icons/bi';
import UNPTextSection from './UNPTextSection';

const UNPNewEntity: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fundacion: '',
    additionalInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting subscription:', formData);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <Container className="py-4">
      <UNPTextSection
        title="Complete Your Subscription"
        text="Fill in the details below to complete your subscription and start enjoying the benefits of our services."
      />
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>
                    <BiUser className="me-2" /> Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>
                    <BiEnvelope className="me-2" /> Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>
                    <BiPhone className="me-2" /> Phone Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFundacion">
                  <Form.Label>
                    <BiBuilding className="me-2" /> Fundacion Name (Optional)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your fundacion name"
                    name="fundacion"
                    value={formData.fundacion}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAdditionalInfo">
                  <Form.Label>Additional Information</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Provide any additional information about your subscription"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" onClick={handleSubmit}>
                    Submit Subscription
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Subscription Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-success">Your subscription has been successfully submitted!</p>
          <p>We will review your details and get back to you shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UNPNewEntity;
