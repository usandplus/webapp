import React, { useEffect, useState } from 'react';
import {
  Container,
  Dropdown,
  Row,
  Col,
  Nav,
  Button,
  Modal,
  Offcanvas,
  ListGroup,
  Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles/UNPAdminLayoutStyles.scss';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { useAuthContext } from '../../firebase/auth/AuthProvider';

interface Section {
  name: string;
  label: string;
  component: React.ReactNode;
}

interface Entity {
  name: string;
  path: string;
}

interface UNPAdminLayoutProps {
  sections: Section[];
  defaultSection?: string;
}

const UNPAdminLayout: React.FC<UNPAdminLayoutProps> = ({ sections, defaultSection }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  const [activeSection, setActiveSection] = useState(defaultSection || sections[0].name);
  const [showModal, setShowModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [entities, setEntities] = useState<Entity[]>([
    { name: 'Default', path: '/dashboard/' },
    { name: 'Gatitos', path: '/admin/organizacion/1' },
    { name: 'Perritos', path: '/admin/organizacion/2' },
  ]);
  const [currentEntity, setCurrentEntity] = useState<string | null>(user?.displayName || null);

  useEffect(() => {
    user && setCurrentEntity(user.displayName);
  }, [user]);

  const changeActiveSection = (section: string) => {
    setActiveSection(section);
    setShowMobileModal(false);
  };

  const handleEntityChange = (entity: Entity) => {
    setCurrentEntity(entity.name);
    navigate(entity.path);
    setActiveSection(sections[0].name);
    setShowModal(false);
    setShowMobileModal(false);
  };

  const activeComponent = sections.find((section) => section.name === activeSection)?.component || null;

  const sidebarContent = (
    <div className="d-flex flex-column h-100 p-3">
      <div className="sidebar-header text-center mb-4">
        <Image
          rounded
          src="/full_logo.png"
          alt="Logo"
          className="mb-3"
          style={{ maxHeight: '60px', objectFit: 'contain' }}
        />
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="entity-dropdown-toggle" className="w-100 text-center">
            {currentEntity}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => (window.location.pathname === '/dashboard' ? null : navigate('/dashboard'))}
              active={window.location.pathname === '/dashboard'}
            >
              {user?.displayName}
            </Dropdown.Item>
            {entities.map((entity, index) => (
              <Dropdown.Item key={index} onClick={() => handleEntityChange(entity)}>
                {entity.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Nav className="flex-column mt-3">
        {sections.map((section) => (
          <Nav.Link
            key={section.name}
            active={activeSection === section.name}
            onClick={() => changeActiveSection(section.name)}
            className={`mb-2 ${activeSection === section.name ? 'bg-primary text-white' : 'text-secondary'} rounded`}
          >
            {section.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );

  return (
    <>
      <Container fluid className="admin-layout gx-0">
        <Row className="gx-0"> {/* Fix: Removed gutter spacing */}
          {/* Sidebar for desktop */}
          <Col lg={4} className="d-none d-lg-block bg-light border-end vh-100">
            {sidebarContent}
          </Col>

          {/* Main Content Area */}
          <Col xs={12} lg={8} className="px-4 scrollable-content">
            {activeComponent}
          </Col>
        </Row>

        {/* Modal for Changing Entity (Desktop) */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Selecciona tu entidad</Modal.Title>
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
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Mobile Offcanvas Menu */}
      <div className="d-lg-none">
        {!showMobileModal && (
          <Button
            variant="primary"
            id="admin-layout-bottom-nav"
            onClick={() => setShowMobileModal(true)}
            className="m-3 fixed-bottom shadow-lg rounded-pill d-flex align-items-center justify-content-between"
            style={{ zIndex: 1050 }}
          >
            <span>{currentEntity}</span>
            <FaArrowAltCircleUp />
          </Button>
        )}

        <Offcanvas
          show={showMobileModal}
          onHide={() => setShowMobileModal(false)}
          placement="bottom"
          className="h-75"
          scroll
        >
          <Offcanvas.Body>{sidebarContent}</Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default UNPAdminLayout;
