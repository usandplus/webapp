import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Table,
  Alert,
  Container,
  Row,
  Col,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import { firestore } from './../../firebase/firebaseConfig'; // Adjust import based on your Firebase setup
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
} from 'firebase/firestore';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: string; // e.g. Admin, Member, etc.
}

const UNPCollaboratorManager: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Colaborador'); // Default role
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = async () => {
    const collabs: Collaborator[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'collaborators'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      collabs.push({ id: doc.id, ...data } as Collaborator);
    });
    setCollaborators(collabs);
  };

  const handleInvite = async () => {
    if (!name || !email) return;

    await addDoc(collection(firestore, 'collaborators'), {
      name,
      email,
      role,
    });

    setName('');
    setEmail('');
    setRole('Member');
    setShowInviteModal(false);
    fetchCollaborators();
  };

  const handleDelete = async (id: string) => {
    const docRef = doc(firestore, 'collaborators', id);
    await deleteDoc(docRef);
    fetchCollaborators();
  };

  const filteredCollaborators = collaborators.filter((collab) =>
    collab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h3>Personas</h3>

      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar personas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Row className="mb-3">
        <Col md={4} xs={12}>
          <Button variant="primary" onClick={() => setShowInviteModal(true)}>
            Invitar Personas
          </Button>
        </Col>
      </Row>

      {filteredCollaborators.length === 0 && <Alert variant="warning">No se encontraron personas.</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCollaborators.map((collab) => (
            <tr key={collab.id}>
              <td>{collab.name}</td>
              <td>{collab.email}</td>
              <td>{collab.role}</td>
              <td>
                <Button variant="link" onClick={() => handleDelete(collab.id)}>
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Invite Modal */}
      <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invitar Personas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formCollaboratorName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCollaboratorEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCollaboratorRole">
            <Form.Label>Rol</Form.Label>
            <br/>
            <small>Todas las personas son invitadas como Colaboradores, una vez que se registren podran ser dados de alta como administradores.</small>
            <Form.Control
              disabled
              as="select"
              value={role}
            >
              <option>Colaborador</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInviteModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleInvite} disabled={!name || !email}>
            Invitar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UNPCollaboratorManager;
