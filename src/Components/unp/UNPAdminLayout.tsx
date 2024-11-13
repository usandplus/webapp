import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Button, Modal, ListGroup } from 'react-bootstrap';
import { firestore } from './../../firebase/firebaseConfig'; // Adjust import based on your Firebase setup
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import { useNavigate } from 'react-router-dom';
import UNPButton from './UNPButton';
interface Section {
  name: string;
  label: string;
  component: React.ReactNode;
}

interface UNPAdminLayoutProps {
  sections: Section[];
  defaultSection?: string;
}

interface Entity {
  name: string;
  path: string;
}

// UNPAdminLayout Component
const UNPAdminLayout: React.FC<UNPAdminLayoutProps> = ({ sections, defaultSection }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [activeSection, setActiveSection] = useState(defaultSection || sections[0].name);
  const [showModal, setShowModal] = useState(false);
  const [entities, setEntities] = useState<Entity[]>([{name: 'Gatitos', path:'/admin/organizacion/2'}]);
  const [currentEntity, setCurrentEntity] = useState<string | null>('Perritos y Animalitos');

  // Fetch entities from Firestore on component mount
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const userRef = collection(firestore, 'users'); // Adjust collection name based on your Firestore structure
        const userSnapshot = await getDocs(userRef);
        const entityList: Entity[] = [];

        userSnapshot.forEach((doc) => {
          // Assuming the user document has an array of accessible entities
          const data = doc.data();
          if (data.entities) {
            entityList.push(...data.entities); // Add entities to the list
          } 
        });

        setEntities(entityList);
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    };

    fetchEntities();
  }, [currentEntity]);

  const handleEntityChange = (entity: Entity) => {
    setCurrentEntity(entity.name);
    navigate(entity.path)
    setActiveSection(sections[0].name); 
    // Reset to default section if needed
    setShowModal(false); // Close the modal
  };
  console.log(entities)
  // Find the component for the active section
  const activeComponent = sections.find((section) => section.name === activeSection)?.component || null;

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="p-0 bg-light">
          <Nav className="flex-column p-3">
            <h4>{currentEntity || 'Select Entity'}</h4>
            <UNPButton variant="primary" onClick={() => setShowModal(true)} className="mb-2">
              Cambiar
            </UNPButton>
            {sections.map((section) => (
              <Nav.Link
                key={section.name}
                active={activeSection === section.name}
                onClick={() => setActiveSection(section.name)}
                className="mb-2"
              >
                {section.label}
              </Nav.Link>
            ))}
          </Nav>
        </Col>
        
        {/* Main Content Area */}
        <Col md={9} className="p-3">
          {activeComponent}
        </Col>
      </Row>

      {/* Modal for Changing Entity */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select an Entity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {entities.map((entity, index) => (
              <ListGroup.Item key={index} action onClick={() => handleEntityChange(entity)}>
                {entity.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <UNPButton variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </UNPButton>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UNPAdminLayout;
