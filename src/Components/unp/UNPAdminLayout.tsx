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
import { signOutUser } from '../../firebase/auth/authService';
import { UserEntityMembership } from '../../types/models/User';


interface Section {
  name: string;
  label: string;
  component: React.ReactNode;
}

interface Entity {
  name: string;
  path: string;
}
interface Link {
  name: string;
  path: string;
}

interface UNPAdminLayoutProps {
  sections: Section[];
  defaultSection?: string;
  links: Link[];
}

const UNPAdminLayout: React.FC<UNPAdminLayoutProps> = ({ sections, defaultSection, links }) => {
  const navigate = useNavigate();
  const { user, userMemberships } = useAuthContext();
  const [activeSection, setActiveSection] = useState(defaultSection || sections[0].name);
  const [showModal, setShowModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [currentEntity, setCurrentEntity] = useState<string | null>(
    localStorage.getItem('currentEntity') || null
  );
  console.log(userMemberships, user)

  useEffect(() => {
    if (userMemberships) {
      const mappedEntities = userMemberships.map((membership) => ({
        name: membership.entityDisplayName || membership.entityId,
        path: `/admin/${membership.entityType}/${membership.entityId}`,
        role: membership.role, // Keep track of the role
      }));
      setEntities(mappedEntities);
  
      if (!currentEntity && mappedEntities.length > 0) {
        const defaultEntity = mappedEntities[0].name;
        setCurrentEntity(defaultEntity);
        localStorage.setItem('currentEntity', defaultEntity);
      }
    }
  }, [userMemberships, currentEntity]);
  

  // Change active section
  const changeActiveSection = (section: string) => {
    setActiveSection(section);
    setShowMobileModal(false);
  };

  // Handle entity change
  const handleEntityChange = (entity: Entity) => {
    setCurrentEntity(entity.name);
    localStorage.setItem('currentEntity', entity.name);
    navigate(entity.path);
    setActiveSection(sections[0].name);
    setShowModal(false);
    setShowMobileModal(false);
  };

  const handleUserSelection = () => {
    const userDisplayName = user?.displayName || 'User';
    setCurrentEntity(userDisplayName);
    localStorage.setItem('currentEntity', userDisplayName);
    navigate('/dashboard');
    setActiveSection(sections[0].name);
    setShowModal(false);
    setShowMobileModal(false);
  };

  const activeComponent = sections.find((section) => section.name === activeSection)?.component || null;

  // Sidebar content
  const sidebarContent = (
    <div className="d-flex flex-column h-100 p-3">
      <div className="sidebar-header text-center mb-4">
        <Image
          rounded
          src="/full_logo.png"
          alt="Logo"
          className="mb-3"
          style={{ maxHeight: '8rem', objectFit: 'contain' }}
        />
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="entity-dropdown-toggle"
            className="w-100 text-center"
          >
            {currentEntity || 'Select Entity'}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            {/* User option */}
            <Dropdown.Item
              onClick={handleUserSelection}
              active={window.location.pathname === '/dashboard'}
            >
              {user?.displayName || 'User'}
            </Dropdown.Item>

            {/* Entity options */}
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
        <Nav.Link
          onClick={() => signOutUser()}
          className={`mb-2 text-secondary rounded`}
        >
          Cerrar Sesion
        </Nav.Link>
      </Nav>
    </div>
  );

  return (
    <>
      <Container fluid className="admin-layout gx-0">
        <Row className="gx-0">
          {/* Sidebar for desktop */}
          <Col lg={4} className="d-none d-lg-block bg-light border-end vh-100">
            {sidebarContent}
          </Col>

          {/* Main Content Area */}
          <Col xs={12} lg={8} className="px-4 scrollable-content pt-0 gy-5">
            {activeComponent}
          </Col>
        </Row>
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
            <span>{currentEntity || 'Select Entity'}</span>
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
