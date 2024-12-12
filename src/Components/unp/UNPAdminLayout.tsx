import React, { useEffect, useState } from 'react';
import {
  Container,
  Dropdown,
  Row,
  Col,
  Nav,
  Button,
  Offcanvas,
  Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles/UNPAdminLayoutStyles.scss';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { useAuthContext } from '../../firebase/auth/AuthProvider';
import { signOutUser } from '../../firebase/auth/authService';

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
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [currentEntity, setCurrentEntity] = useState<string | null>(
    localStorage.getItem('currentEntity') || null
  );

  useEffect(() => {
    if(window.location.pathname === '/dashboard'){
      if(currentEntity !== user!.displayName!){
        setCurrentEntity(user!.displayName!)
      }
    }
    if (userMemberships) {
      const mappedEntities = userMemberships.map((membership) => ({
        name: membership.entityDisplayName || membership.entityId,
        path: `/admin/${membership.entityType}/${membership.entityId}`,
      }));
      setEntities(mappedEntities);

      if (!currentEntity && mappedEntities.length > 0) {
        const defaultEntity = mappedEntities[0].name;
        setCurrentEntity(defaultEntity);
        localStorage.setItem('currentEntity', defaultEntity);
      }
    }
  }, [user, userMemberships, currentEntity]);

  const changeActiveSection = (section: string) => {
    setActiveSection(section);
    setShowMobileModal(false);
  };

  const handleEntityChange = (entity: Entity) => {
    setCurrentEntity(entity.name);
    localStorage.setItem('currentEntity', entity.name);
    navigate(entity.path);
    setActiveSection(sections[0].name);
  };
  
  const sidebarContent = (
    <div className="d-flex flex-column sidebar h-100">
      <div className="sidebar-header text-center mb-4">
        <Image src="/full_logo.png" style={{maxHeight: 200}} alt="Logo" className="mb-3 logo" />
        <Dropdown>
          <Dropdown.Toggle className="w-100">
            {currentEntity || 'Select Entity'}
          </Dropdown.Toggle>
          <Dropdown.Menu  className="w-100">
              <Dropdown.Item className={`${window.location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>
                {user?.displayName}
              </Dropdown.Item>
            {entities.map((entity, index) => (
              <Dropdown.Item className={`${currentEntity === entity.name ? 'active' : ''}`} key={index} onClick={() => handleEntityChange(entity)}>
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
            className={`sidebar-link ${activeSection === section.name ? 'active' : ''}`}
            onClick={() => changeActiveSection(section.name)}
          >
            {section.label}
          </Nav.Link>
        ))}
        <Nav.Link onClick={signOutUser} className="sidebar-link logout">
          Log Out
        </Nav.Link>
      </Nav>
    </div>
  );

  return (
    <Container fluid className="admin-layout gx-0">
      <Row className="gx-0">
        {/* Sidebar */}
        <Col lg={3} className="d-none sidebar d-lg-block bg-light">
          {sidebarContent}
        </Col>
        {/* Main Content */}
        <Col xs={12} lg={9} className="scrollable-content p-4">
          {sections.find((section) => section.name === activeSection)?.component}
        </Col>
      </Row>
      {/* Mobile Sidebar */}
      <Offcanvas 
      show={showMobileModal} 
      onHide={() => setShowMobileModal(false)} 
      placement="bottom"
      className='h-75'
      >
        <Offcanvas.Body>{sidebarContent}</Offcanvas.Body>
      </Offcanvas>
      <Button
        variant="primary"
        style={{marginBottom: 90}}
        className={`${showMobileModal ? 'd-none' : ''} d-lg-none shadow-sm fixed-bottom mx-3 rounded-pill`}
        onClick={() => setShowMobileModal(true)}
      >
        <FaArrowAltCircleUp />
        {currentEntity}
      </Button>
    </Container>
  );
};

export default UNPAdminLayout;
