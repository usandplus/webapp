import React, { FC, useEffect, useState } from 'react';
import {
  Container,
  Card,
  Form,
  Button,
  Modal,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { UNPBasePublicUser } from '../../types/models/common';
import { getUserProfile } from '../../firebase/services/userService';

interface EditProfileProps {
  userId: string;
  onSave?: (data: UNPBasePublicUser) => void;
}

// Configuration for fields: label, type, and their corresponding keys in the profile
// type 'text'    -> Simple text input
// type 'textarea'-> Multi-line text input
// type 'array'   -> Array of strings handled as comma-separated input
// type 'json'    -> Array of objects handled as JSON text
const FIELDS = [
  { key: 'displayName', label: 'Display Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'history', label: 'History', type: 'textarea' },
  { key: 'logo', label: 'Logo URL', type: 'text' },
  { key: 'aboutUs', label: 'About Us', type: 'textarea' },
  { key: 'services', label: 'Services', type: 'array' },
  { key: 'locationCity', label: 'City', type: 'text' },
  { key: 'locationCountry', label: 'Country', type: 'text' },
  { key: 'importantPeople', label: 'Important People', type: 'json' },
  // { key: 'events', label: 'Events', type: 'json' },
  { key: 'categories', label: 'Categories', type: 'text' },
];

const EditProfile: FC<EditProfileProps> = ({ userId, onSave }) => {
  const [originalProfile, setOriginalProfile] = useState<UNPBasePublicUser | null>(null);
  const [editedProfile, setEditedProfile] = useState<UNPBasePublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserProfile(userId);
        if (isMounted) {
          setOriginalProfile(data);
          setEditedProfile({ ...data });
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load profile. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleFieldChange = (key: string, value: string) => {
    if (!editedProfile) return;
    const fieldConfig = FIELDS.find((f) => f.key === key);

    if (!fieldConfig) return;

    let updatedValue: any = value;

    switch (fieldConfig.type) {
      case 'array':
        // Convert comma-separated to array of strings
        updatedValue = value
          .split(',')
          .map((v) => v.trim())
          .filter((v) => v);
        break;
      case 'json':
        // Expect a JSON array of objects
        try {
          updatedValue = JSON.parse(value);
        } catch (err) {
          // If invalid JSON, don't update to something broken. 
          // You could also handle this with validation and user feedback.
          return;
        }
        break;
      // 'text' and 'textarea' remain as is
      default:
        // For text or textarea, updatedValue is just the raw string
        break;
    }

    setEditedProfile((prev) => (prev ? { ...prev, [key]: updatedValue } : prev));
    setUnsavedChanges(true);
  };

  const handleVisibilityToggle = (key: string) => {
    if (!editedProfile) return;
    if (!editedProfile.visibility || typeof editedProfile.visibility[key] === 'undefined') return;

    setEditedProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        visibility: {
          ...prev.visibility,
          [key]: !prev.visibility[key],
        },
      };
    });
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const confirmSave = () => {
    if (editedProfile && onSave) {
      onSave(editedProfile);
      setOriginalProfile({ ...editedProfile });
    }
    setUnsavedChanges(false);
    setShowModal(false);
  };

  const handleDiscardChanges = () => {
    // Just revert to original profile without refetching
    if (originalProfile) {
      setEditedProfile({ ...originalProfile });
      setUnsavedChanges(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
        <p>Loading profile...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!editedProfile) {
    return (
      <Container className="py-5">
        <Alert variant="warning">No profile data available.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Edit Profile</h1>
      {FIELDS.map(({ key, label, type }) => {
        const visible = editedProfile.visibility[key] ?? false;

        let displayValue = '';
        const currentValue = (editedProfile as any)[key];

        // Convert arrays/JSON back to string for editing
        if (type === 'array') {
          displayValue = Array.isArray(currentValue) ? currentValue.join(', ') : '';
        } else if (type === 'json') {
          displayValue = JSON.stringify(currentValue ?? [], null, 2);
        } else {
          displayValue = currentValue ?? '';
        }

        const formControl =
          type === 'textarea' ? (
            <Form.Control
              as="textarea"
              rows={3}
              value={displayValue}
              onChange={(e) => handleFieldChange(key, e.target.value)}
            />
          ) : type === 'json' ? (
            <Form.Control
              as="textarea"
              rows={6}
              value={displayValue}
              onChange={(e) => handleFieldChange(key, e.target.value)}
            />
          ) : (
            <Form.Control
              type="text"
              value={displayValue}
              onChange={(e) => handleFieldChange(key, e.target.value)}
            />
          );

        return (
          <Card key={key} className="mb-3 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>{label}</strong>
              <Form.Check
                type="switch"
                label={visible ? 'Visible' : 'Hidden'}
                checked={visible}
                onChange={() => handleVisibilityToggle(key)}
              />
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>{label}</Form.Label>
                {formControl}
                {type === 'array' && (
                  <Form.Text className="text-muted">
                    Separate multiple entries with commas.
                  </Form.Text>
                )}
                {type === 'json' && (
                  <Form.Text className="text-muted">
                    Enter a JSON array. Example: [{`"name":"Jane","role":"CEO"`}]
                  </Form.Text>
                )}
              </Form.Group>
            </Card.Body>
          </Card>
        );
      })}

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
        <Modal.Body>
          Are you sure you want to save these changes to the profile?
        </Modal.Body>
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

export default EditProfile;
