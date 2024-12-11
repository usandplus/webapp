import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form, Image, Spinner } from 'react-bootstrap';
import UNPTextSection from '../../Components/unp/UNPTextSection';
import { EntityService } from '../../firebase/services/entityService';
import { useAuthContext } from '../../firebase/auth/AuthProvider';
import { UNPBaseEntityType } from '../../types/models/common';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

interface ACRequest {
  name: string;
  displayName: string;
  email: string;
  rfc: string;
  type: UNPBaseEntityType; // e.g., 'ac'
  createdBy: string;
  ownerId: string;
  ownerDisplayName: string;
}

const NewACView: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ACRequest>({
    ownerId: user?.userId || 'none',
    ownerDisplayName: user?.displayName || 'none',
    createdBy: user?.userId || 'none',
    name: '',
    displayName: '',
    email: '',
    rfc: '',
    type: 'ac',
  });

  const [errors, setErrors] = useState({
    name: '',
    displayName: '',
    email: '',
    rfc: '',
  });
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isFormReady, setIsFormReady] = useState(false);
  const [newOrgId, setNewOrgId] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'rfc' ? value.toUpperCase() : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === 'rfc' && newValue.length < 13) {
      setErrors((prev) => ({
        ...prev,
        rfc: 'RFC debe tener 13 caracteres (solo letras y números).',
      }));
    } else if (name === 'rfc' && !/^[A-Z0-9]{13}$/.test(newValue)) {
      setErrors((prev) => ({
        ...prev,
        rfc: 'Formato de RFC inválido.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    setIsFormReady(validateForm({ ...formData, [name]: newValue }));
  };

  const validateForm = (data: ACRequest): boolean => {
    const newErrors = {
      name: !data.name ? 'Campo Obligatorio' : '',
      displayName: !data.displayName ? 'Campo Obligatorio' : '',
      email: !data.email
        ? 'Campo Obligatorio'
        : !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)
          ? 'Formato Invalido'
          : '',
      rfc: !data.rfc
        ? 'Campo Obligatorio'
        : !/^[A-Z0-9]{13}$/.test(data.rfc)
          ? 'Formato Invalido (13 caracteres, sin caracteres especiales)'
          : '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async () => {
    if (!isFormReady) return;
    setLoading(true)
    setShowModal(true);
    const result = await EntityService.createEntity(
      formData.ownerId,
      'ac',
      formData
    );

    if (result.success) {
      setNewOrgId(result.message)
      setSuccess(true)
      setModalMessage('¡Tu asociacion civil ha sido registrada con éxito!')
      setLoading(false)
    } else {
      setSuccess(false)
      setModalMessage(`Error: ${result.message}`);
      setLoading(false)
    }
  };

  const closeModal = () => {
    setModalMessage('');
    
    setShowModal(false);
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <UNPTextSection
                title="Registra tu asosiacion civil"
                text="Bienvenido a Us & Plus! Llena el formulario para comenzar tu proceso de validación."
              />
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Denominación Social <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa la denominación social"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    isInvalid={!!errors.displayName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.displayName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre/Marca <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el nombre o marca"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="correo@tuac.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>RFC <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="RFC (13 caracteres)"
                    name="rfc"
                    value={formData.rfc}
                    onChange={handleChange}
                    maxLength={13}
                    isInvalid={!!errors.rfc}
                  />
                  <Form.Control.Feedback type="invalid">{errors.rfc}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!isFormReady}
                  >
                    {isFormReady ? 'Enviar Registro' : 'Completa el Formulario'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registro de ac</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <p>
            {loading
              ? <Spinner variant='primary'/>
              : success
                ? <BiCheckCircle size='36' color='green' />
                : <BiXCircle size='36' color='red' />}
          </p>

          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          {loading
            ? <></>
            : success
              ? <Button variant="primary" onClick={() => navigate(`/admin/${newOrgId}`)}>
                Continuar
              </Button>
              : <Button variant="primary" onClick={closeModal}>
                Regresar
              </Button>
          }
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewACView;
