import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import { UNPImportantPeople, UNPBaseEvent } from '../../types/models/common';


interface ProfileInfo {
  name: string;
  description: string;
  history: string;
  locationAddress: string;
  locationCity: string;
  locationCountry: string;
  locationZipcode: string;
  logo: string;
  aboutUs: string;
  services: string[];
  importantPeople: UNPImportantPeople[];
  events: UNPBaseEvent[];
  categories: string;
}

type UNPEditProfileProps = {
  initialData: ProfileInfo;
  onSave: (data: ProfileInfo) => void;
};

const UNPEditProfile: React.FC<UNPEditProfileProps> = ({ initialData, onSave }) => {
  const [profile, setProfile] = useState<ProfileInfo>(initialData);
  const [showModal, setShowModal] = useState(false);
  const [logoPreview, setLogoPreview] = useState(initialData.logo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
        setProfile((prev) => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const confirmSave = () => {
    onSave(profile);
    setShowModal(false);
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Edit Profile</h1>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={profile.description}
                onChange={handleInputChange}
                placeholder="Enter a brief description"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="history" className="mt-3">
          <Form.Label>History</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="history"
            value={profile.history}
            onChange={handleInputChange}
            placeholder="Enter the history of your organization"
          />
        </Form.Group>

        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="locationAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="locationAddress"
                value={profile.locationAddress}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="locationCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="locationCity"
                value={profile.locationCity}
                onChange={handleInputChange}
                placeholder="Enter city"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <Form.Group controlId="locationCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="locationCountry"
                value={profile.locationCountry}
                onChange={handleInputChange}
                placeholder="Enter country"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="locationZipcode">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                name="locationZipcode"
                value={profile.locationZipcode}
                onChange={handleInputChange}
                placeholder="Enter zipcode"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="logo">
              <Form.Label>Logo</Form.Label>
              <Form.Control type="file" onChange={handleLogoChange} />
              {logoPreview && <Image src={logoPreview} thumbnail className="mt-2" />}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="aboutUs" className="mt-3">
          <Form.Label>About Us</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="aboutUs"
            value={profile.aboutUs}
            onChange={handleInputChange}
            placeholder="Enter details about your organization"
          />
        </Form.Group>

        <Form.Group controlId="categories" className="mt-3">
          <Form.Label>Categories</Form.Label>
          <Form.Control
            type="text"
            name="categories"
            value={profile.categories}
            onChange={handleInputChange}
            placeholder="Enter categories"
          />
        </Form.Group>

        <Button variant="primary" className="mt-4" onClick={handleSave}>
          Save Changes
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to save these changes?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UNPEditProfile;