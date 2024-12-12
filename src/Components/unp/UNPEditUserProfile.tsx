import React, { useState } from 'react';
import {
  Container,
  Card,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { UNPImportantPeople, UNPBaseEvent } from '../../types/models/common';

export interface UserProfileInfo {
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
  visibility: Record<string, boolean>;
}

type UNPEditUserProfileProps = {
  initialData?: UserProfileInfo;
  onSave?: (data: UserProfileInfo) => void;
  useTestData?: boolean;
};

const testData: UserProfileInfo = {
  name: 'Test Name',
  description: 'Test Description',
  history: 'This is a test history.',
  locationAddress: '123 Test St',
  locationCity: 'Test City',
  locationCountry: 'Test Country',
  locationZipcode: '12345',
  logo: 'https://via.placeholder.com/150',
  aboutUs: 'About us for testing purposes.',
  services: ['Service 1', 'Service 2'],
  importantPeople: [],
  events: [],
  categories: 'Test Category',
  visibility: {
    name: true,
    description: true,
    history: true,
    locationAddress: true,
    locationCity: true,
    locationCountry: true,
    locationZipcode: true,
    logo: true,
    aboutUs: true,
    services: true,
    importantPeople: true,
    events: true,
    categories: true,
  },
};

const UNPEditUserProfile: React.FC<UNPEditUserProfileProps> = ({
  initialData,
  onSave,
  useTestData = false,
}) => {
  const [profile, setProfile] = useState<UserProfileInfo>(
    useTestData ? testData : initialData!
  );
  const [showModal, setShowModal] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  console.log(profile)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setUnsavedChanges(true);
  };

  const handleToggle = (section: string) => {
    setProfile((prev) => ({
      ...prev,
      visibility: { ...prev.visibility, [section]: !prev.visibility[section] },
    }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const confirmSave = () => {
    if (onSave) {
      onSave(profile);
    }
    setUnsavedChanges(false);
    setShowModal(false);
  };

  const handleDiscardChanges = () => {
    setProfile(useTestData ? testData : initialData!);
    setUnsavedChanges(false);
  };

  const renderCardContent = (field: string) => {
    switch (field) {
      case 'name':
      case 'description':
      case 'history':
      case 'locationAddress':
      case 'locationCity':
      case 'locationCountry':
      case 'locationZipcode':
      case 'categories':
        return (
          <Form.Group controlId={field}>
            <Form.Label className="text-capitalize">{field.replace(/([A-Z])/g, ' $1')}</Form.Label>
            <Form.Control
              type="text"
              name={field}
              value={(profile as any)[field]}
              onChange={handleInputChange}
              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            />
          </Form.Group>
        );
      case 'aboutUs':
        return (
          <Form.Group controlId={field}>
            <Form.Label>About Us</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name={field}
              value={profile.aboutUs}
              onChange={handleInputChange}
              placeholder="Enter details about your organization"
            />
          </Form.Group>
        );
      case 'services':
        return (
          <Form.Group controlId={field}>
            <Form.Label>Services</Form.Label>
            <Form.Control
              type="text"
              name={field}
              value={profile.services.join(', ')}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  services: e.target.value.split(',').map((s) => s.trim()),
                }))
              }
              placeholder="Enter services separated by commas"
            />
          </Form.Group>
        );
      case 'logo':
        // return (
        //   <Form.Group controlId={field}>
        //     <Form.Label>Logo</Form.Label>
        //     <Form.Control
        //       type="file"
        //       onChange={(e) => {
        //         if (e.target.files && e.target.files[0]) {
        //           const file = e.target.files[0];
        //           const reader = new FileReader();
        //           reader.onload = () => {
        //             setProfile((prev) => ({ ...prev, logo: reader.result as string }));
        //           };
        //           reader.readAsDataURL(file);
        //         }
        //       }}
        //     />
        //     {profile.logo && <Image src={profile.logo} thumbnail className="mt-2" />}
        //   </Form.Group>
        // );
        break;
      default:
        return null;
    }
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Edit Profile</h1>
      {Object.keys(profile.visibility).map((field) => (
        <Card key={field} className="mb-3 shadow">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <strong className="text-capitalize">{field.replace(/([A-Z])/g, ' $1')}</strong>
            <Form.Check
              type="switch"
              id={`toggle-${field}`}
              label={profile.visibility[field] ? 'Visible' : 'Hidden'}
              checked={profile.visibility[field]}
              onChange={() => handleToggle(field)}
            />
          </Card.Header>
          <Card.Body>{renderCardContent(field)}</Card.Body>
        </Card>
      ))}

      {unsavedChanges && (
        <div className="text-center mt-4">
          <Button variant="success" className="me-2" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleDiscardChanges}>
            Discard Changes
          </Button>
        </div>
      )}

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

export default UNPEditUserProfile;