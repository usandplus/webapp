import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import { BiCheckCircle, BiInfoCircle } from 'react-icons/bi';
import { FaFileAlt, FaArrowRight } from 'react-icons/fa';
import UNPTextSection from './UNPTextSection';

interface Document {
  id: number;
  title: string;
  description: string;
  uploaded: boolean;
}

const documents: Document[] = [
  { id: 1, title: 'INE', description: 'Credencial para votar', uploaded: false },
  { id: 2, title: 'Licencia de Conducir', description: 'Cualquier estado de la republica', uploaded: true },
  { id: 3, title: 'Comprobante de domicilio', description: 'No mayor a 3 meses', uploaded: true },
  { id: 4, title: 'Comprobante bancario', description: 'No mayor a 3 meses', uploaded: false },
];

const UNPUserDocumentManager: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (doc: Document) => {
    console.log('Card clicked:', doc);
    setSelectedDocument(doc);
    setShowModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File uploaded for document:', selectedDocument?.title);
    console.log('File:', e.target.files);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  return (
    <Container fluid className="py-4">
      <UNPTextSection title='Tus documentos en Us & Plus' text='Es importante que mantengas tus documentos actualizados para poder disfrutar todos los beneficios de Us & Plus.'/>
      <Row className="g-3">
        {documents.map(doc => (
          <Col key={doc.id} xs={12} sm={12} lg={6} className="d-flex justify-content-center">
            <Card
              className="w-100 p-3 d-flex flex-row align-items-center shadow-sm"
              style={{
                cursor: 'pointer',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
              }}
              onClick={() => handleCardClick(doc)}
            >
              <div
                className={`d-flex align-items-center justify-content-center ${doc.uploaded ? 'bg-success': 'bg-warning'}`}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  marginRight: '16px',
                }}
              >
                {
                  doc.uploaded
                    ? <BiCheckCircle size={24} color="white" />
                    : <BiInfoCircle size={24} color="#6c757d" />
                }
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-1 text-primary">{doc.title}</h5>
                <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                  {doc.description}
                </p>
              </div>
              <FaArrowRight size={20} color="#6c757d" />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDocument?.title || 'Upload Document'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            {selectedDocument?.description || 'Please upload the required document.'}
          </p>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose a file to upload</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => console.log('Save clicked for', selectedDocument)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UNPUserDocumentManager;
