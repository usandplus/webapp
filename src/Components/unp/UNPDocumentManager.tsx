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
  Dropdown,
  Modal,
} from 'react-bootstrap';
import UNPButton from './UNPButton';

import { storage, firestore } from './../../firebase/firebaseConfig'; // Adjust import based on your Firebase setup
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';

interface Document {
  id: string;
  name: string;
  type: string; // e.g. pdf, doc, etc.
  url: string;
  starred: boolean;
  createdAt: string;
}

const UNPDocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStarred, setFilterStarred] = useState(false);
  const [filterType, setFilterType] = useState<string>('Tipo de Documento');
  const [filterDate, setFilterDate] = useState<string>('Fecha');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const docs: Document[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'documents'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      docs.push({ id: doc.id, ...data } as Document);
    });
    setDocuments(docs);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `documents/${file.name}`);

    // Upload file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get download URL
    const url = await getDownloadURL(storageRef);

    // Add document info to Firestore
    await addDoc(collection(firestore, 'documents'), {
      name: file.name,
      type: file.type.split('/')[1], // e.g. pdf, doc, etc.
      url,
      starred: false,
      createdAt: new Date().toISOString(),
    });

    setFile(null);
    setShowUploadModal(false);
    setUploading(false);
    fetchDocuments();
  };

  const handleDelete = async (id: string) => {
    const docRef = doc(firestore, 'documents', id);
    const docData = documents.find((doc) => doc.id === id);

    // Delete file from Firebase Storage
    const fileRef = ref(storage, `documents/${docData?.name}`);
    await deleteObject(fileRef);

    // Delete document from Firestore
    await deleteDoc(docRef);
    fetchDocuments();
  };

  const toggleStar = async (id: string) => {
    const docRef = doc(firestore, 'documents', id);
    const docData = documents.find((doc) => doc.id === id);

    await updateDoc(docRef, { starred: !docData?.starred });
    fetchDocuments();
  };

  const filteredDocuments = documents.filter((doc) =>
    (!filterStarred || doc.starred) &&
    (filterType === 'All' || doc.type === filterType) &&
    (filterDate === 'All' || new Date(doc.createdAt).toLocaleDateString() === filterDate) &&
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterStarred(false);
    setFilterType('All');
    setFilterDate('All');
  };

  return (
    <Container>
      <h3>Administracion de Documentos</h3>

      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar documentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Row className="mb-3">
        <Col md={4} xs={12}>
          <UNPButton variant="primary" onClick={() => setShowUploadModal(true)}>
            + Nuevo
          </UNPButton>
        </Col>

        <Col md={8} xs={12}>
          <Row>
            <Col md={4} xs={12}>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="filter-type-dropdown">
                  {filterType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterType('Tipo de Documento')}>Tipo de Documento</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterType('pdf')}>PDF</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterType('doc')}>DOC</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterType('xls')}>Excel</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterType('ppt')}>PowerPoint</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col md={4} xs={12}>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="filter-date-dropdown">
                  {filterDate}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterDate('Fecha')}>Fecha</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterDate(new Date().toLocaleDateString())}>Today</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString())}>Last 7 Days</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString())}>Last 30 Days</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col md={4} xs={12}>
              <Form.Check
                type="checkbox"
                label="Show Starred"
                checked={filterStarred}
                onChange={(e) => setFilterStarred(e.target.checked)}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {filteredDocuments.length === 0 && <Alert variant="warning">No documents found.</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Date Uploaded</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{doc.type}</td>
              <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
              <td>
                <UNPButton variant="link" href={doc.url} target="_blank">
                  View
                </UNPButton>
                <UNPButton variant="link" onClick={() => handleDelete(doc.id)}>
                  Delete
                </UNPButton>
                <UNPButton
                  variant="link"
                  onClick={() => toggleStar(doc.id)}
                  className={doc.starred ? 'text-warning' : ''}
                >
                  {doc.starred ? 'Unstar' : 'Star'}
                </UNPButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subir Documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile">
            <Form.Label>Selecciona el documento</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const target = e.target as HTMLInputElement; // Type assertion
                if (target.files && target.files.length > 0) {
                  setFile(target.files[0]);
                }
              }}  
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <UNPButton variant="error" onClick={() => setShowUploadModal(false)}>
            Cancelar
          </UNPButton>
          <UNPButton variant="primary" onClick={handleUpload} disabled={uploading || !file}>
            {uploading ? 'Subiendo...' : 'Subir'}
          </UNPButton>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UNPDocumentManager;
