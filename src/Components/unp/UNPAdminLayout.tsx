import React, { useEffect, useState } from 'react';
import { Container, Dropdown, Row, Col, Nav, Button, Modal, Offcanvas, ListGroup, Card, Image } from 'react-bootstrap';
import { firestore } from './../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './styles/UNPAdminLayoutStyles.scss';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { useAuthContext } from '../../firebase/auth/AuthProvider';

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

const UNPAdminLayout: React.FC<UNPAdminLayoutProps> = ({ sections, defaultSection }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  const [activeSection, setActiveSection] = useState(defaultSection || sections[0].name);
  const [showModal, setShowModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [entities, setEntities] = useState<Entity[]>([
    { name: 'Default', path: '/dashboard/' },
    { name: 'Gatitos', path: '/admin/organizacion/1' },
    { name: 'Gatitos', path: '/admin/organizacion/2' },
  ]);
  const [currentEntity, setCurrentEntity] = useState<string | null>(user && user.displayName);

  useEffect(() => { user && setCurrentEntity(user.displayName) }, [loading])

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const userRef = collection(firestore, 'users');
        const userSnapshot = await getDocs(userRef);
        const entityList: Entity[] = [];

        userSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.memberships) {
            entityList.push(...data.memberships);
          }
        });

        setEntities(entityList);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntities();
  }, [currentEntity]);

  const changeActiveSection = (section: string) => {
    setActiveSection(section)
    setShowMobileModal(false);
  }

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
        <Dropdown className="entity-dropdown">
          <Dropdown.Toggle variant="primary" id="entity-dropdown-toggle" className="w-100 text-center">
            {currentEntity}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            {entities.map((entity, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleEntityChange(entity)}
                className="text-primary"
              >
                {entity.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Nav className="flex-column mt-3">
        {sections.map((section) => {
          const isActive = activeSection === section.name;
          return (
            <Nav.Link
              key={section.name}
              active={isActive}
              onClick={() => changeActiveSection(section.name)}
              className={`mb-2 ${isActive ? 'bg-primary text-white' : 'text-secondary'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {section.label}
            </Nav.Link>
          );
        })}
      </Nav>
    </div>
  );

  return (
    <>
      <Container fluid className="admin-layout ">
        <Row noGutters>
          {/* Sidebar: Visible on md and above with full viewport height */}
          <Col lg={4} className="sidebar d-none d-lg-block bg-light border-end vh-100">
            {sidebarContent}
          </Col>

          {/* Main Content Area */}
          <Col lg={7} className="admin-main-content p-5">
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
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => handleEntityChange(entity)}
                  className="entity-list-item"
                >
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
      <div className="d-block d-lg-none">
        {
          showMobileModal
            ? <></>
            : <Button
              variant="primary"
              id="admin-layout-bottom-nav"
              onClick={() => setShowMobileModal(true)}
              className="m-3 fixed-bottom shadow-lg rounded-pill d-flex align-items-center"
              style={{ zIndex: 1050 }}
              aria-label="Open menu"
            >
              <span className="flex-grow-1 text-start">{currentEntity}</span>
              <FaArrowAltCircleUp className="ms-2" />
            </Button>
        }

        <Offcanvas
          show={showMobileModal}
          onHide={() => setShowMobileModal(false)}
          placement="bottom"
          className="h-75"
          aria-labelledby="mobile-menu-title"
          scroll={true}
        >
          <Offcanvas.Body className=" overflow-auto">
            {sidebarContent}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default UNPAdminLayout;
