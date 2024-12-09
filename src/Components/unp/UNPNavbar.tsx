import React, { useState } from 'react';
import { Navbar, Nav, Container, Image, Offcanvas, Spinner } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { signOutUser } from '../../firebase/auth/authService';
import { useAuthContext } from '../../firebase/auth/AuthProvider';
import UNPButton from './UNPButton';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

interface NavLink {
  name: string;
  path: string;
  external?: boolean;
  auth?: boolean;
}

interface UNPNavbarProps {
  links?: NavLink[];
  isScrolled?: boolean;
}

const FIXED_LINKS: NavLink[] = [
];

// Bottom nav items for users that are **not** logged in (3 items)
const BOTTOM_NAV_ITEMS_LOGGED_OUT: NavLink[] = [
  { name: "Directorio", path: "/" },
  { name: "Descubre", path: "/unete" },
  { name: "Inicia Sesion", path: "/login" },
];

// Bottom nav items for users that **are** logged in (5 items)
const BOTTOM_NAV_ITEMS_LOGGED_IN: NavLink[] = [
  { name: "Directorio", path: "/" },
  { name: "Mensajes", path: "/mensajes" },
  { name: "Perfil", path: "/perfil" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Notificaciones", path: "/notificaciones" },
];
const RIGHT_NAV_ITEMS_LOGGED_OUT: NavLink[] = [
  { name: "Directorio", path: "/" },
  { name: "Descubre", path: "/unete" },
  { name: "Inicia Sesion", path: "/login" },
];

// Bottom nav items for users that **are** logged in (5 items)
const RIGHT_NAV_ITEMS_LOGGED_IN: NavLink[] = [
  // { name: "Directorio", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Mensajes", path: "/mensajes" },
  // { name: "Perfil", path: "/perfil" },
  { name: "Notificaciones", path: "/notificaciones" },
];

const UNPNavbar: React.FC<UNPNavbarProps> = ({ links = [], isScrolled }) => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const rightNavItems = user ? RIGHT_NAV_ITEMS_LOGGED_IN : RIGHT_NAV_ITEMS_LOGGED_OUT
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  console.log('navbar', window.location)

  const desktopLinks = [...FIXED_LINKS, ...links].filter(link => {
    if (link.auth && !user) return false;
    return true;
  });

  const renderDesktopNavbar = () => (
    <Navbar
      bg="white"
      variant="light"
      expand="lg"
      className={`unp-navbar ${isScrolled ? 'navbar-scrolled' : 'border-bottom'}`}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            {/* UNP */}
            <Image alt="" src="/isotype.png" className="d-inline-block align-top" height={32} />
            <Image alt="" src="/name_rectangle.png" className="d-inline-block align-top" width={150} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="unp-navbar-nav" />
        <Navbar.Collapse id="unp-navbar-nav">
          {/* Left side: Navigation Links */}
          <Nav className="me-auto">
            {desktopLinks.map((link) =>
              link.external ? (
                <Nav.Link
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  {link.name}
                </Nav.Link>
              ) : (
                <LinkContainer key={link.name} to={link.path}>
                  <Nav.Link className="text-primary">{link.name}</Nav.Link>
                </LinkContainer>
              )
            )}
          </Nav>

          {/* Right side: CTA & User Section */}
          <Nav className="ms-auto d-flex align-items-center">
            <UNPButton
              variant="outline-primary"
              className="me-3"
              onClick={() => navigate('/unete')}
            >
              Únete al directorio
            </UNPButton>

            {loading ? (
              <Spinner animation="border" variant="primary" size="sm" />
            ) : user ? (
              <>
                <button
                  className="btn btn-link text-primary d-flex align-items-center"
                  onClick={handleShowOffcanvas}
                  style={{ textDecoration: 'none' }}
                >
                  <Image
                    roundedCircle
                    style={{ width: 30, height: 30 }}
                    src={user?.photoURL || '/default-profile.png'}
                    alt={user?.displayName || 'Profile'}
                  />
                  <i className="bi bi-chevron-right ms-1"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-link text-primary d-flex align-items-center"
                  onClick={handleShowOffcanvas}
                  style={{ textDecoration: 'none' }}
                >
                  <FaUserCircle size='30' />
                  <i className="bi bi-chevron-right ms-1"></i>
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  const renderMobileBottomNavbar = () => {
    const bottomNavItems = user ? BOTTOM_NAV_ITEMS_LOGGED_IN : BOTTOM_NAV_ITEMS_LOGGED_OUT;

    return (
      <Navbar
        bg="light"
        variant="primary"
        className="d-flex d-lg-none justify-content-around border-top mx-1"
        fixed="bottom"
        aria-label="Mobile bottom navigation"
      >
        {bottomNavItems.map((item) => {
          let iconClass = '';
          switch (item.name) {
            case 'Inicio':
            case 'Dashboard':
              iconClass = 'bi bi-speedometer2';
              break;
            case 'Directorio':
              iconClass = 'bi bi-house';
              break;
            case 'Perfil':
              iconClass = 'bi bi-person';
              break;
            case 'Inicia Sesion':
              iconClass = 'bi bi-person';
              break;
            case 'Mensajes':
              iconClass = 'bi bi-chat-dots';
              break;
            case 'Notificaciones':
              iconClass = 'bi bi-bell';
              break;
            case 'Ayuda':
              iconClass = 'bi bi-question-circle';
              break;
            case 'Descubre':
              iconClass = 'bi bi-person-plus';
              break;
            default:
              iconClass = 'bi bi-circle';
              break;
          }

          return (
            <LinkContainer key={item.name} to={item.path}
              style={{ zIndex: 1050 }}>
              <Nav.Link
                className="text-center text-primary"
                aria-label={item.name}
              >
                <i className={`${iconClass} d-block`} style={{ fontSize: '1.2rem' }}></i>
                <small>{item.name}</small>
              </Nav.Link>
            </LinkContainer>
          );
        })}
      </Navbar>
    );
  };

  return (
    <>
      {/* Desktop/Tablet navbar (hidden on xs) */}
      <div className="d-none d-lg-block">
        {renderDesktopNavbar()}
      </div>
      {/* Mobile bottom navbar (visible only on xs) */}
      <div className="d-block d-lg-none">
        {renderMobileBottomNavbar()}
      </div>

      {/* Offcanvas Component */}
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end" backdrop={true} scroll={false} style={{ zIndex: 3000 }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {loading ? (
            <Spinner animation="border" variant="primary" size="sm" />
          ) : user ? (
            <div className='text-center border-bottom mb-2'>
              <Image
                roundedCircle
                style={{ width: 96, height: 96 }}
                src={user.photoURL || '/default-profile.png'}
                alt={user.displayName || 'Profile'}
              />
                <h3 className='text-primary mt-3'>{user.displayName}</h3>
            </div>
          ) : (
            <div className='text-center'>
                  <FaUserCircle
                    className='text-primary'
                // style={{ width: 96, height: 96 }}
                size='96' />
            </div>
          )}
          <Nav className="flex-column">
            {user ? (
              <>

                {rightNavItems.map((item) => {
                  let iconClass = '';
                  switch (item.name) {
                    case 'Inicio':
                    case 'Dashboard':
                      iconClass = 'bi bi-speedometer2';
                      break;
                    case 'Directorio':
                      iconClass = 'bi bi-house';
                      break;
                    case 'Perfil':
                      iconClass = 'bi bi-person';
                      break;
                    case 'Inicia Sesion':
                      iconClass = 'bi bi-person';
                      break;
                    case 'Mensajes':
                      iconClass = 'bi bi-chat-dots';
                      break;
                    case 'Notificaciones':
                      iconClass = 'bi bi-bell';
                      break;
                    case 'Ayuda':
                      iconClass = 'bi bi-question-circle';
                      break;
                    case 'Descubre':
                      iconClass = 'bi bi-person-plus';
                      break;
                    default:
                      iconClass = 'bi bi-circle';
                      break;
                  }

                  return (
                    <LinkContainer key={item.name} to={item.path}
                      style={{ zIndex: 1050 }}>
                      <Nav.Link
                        className="text-left text-muted"
                        aria-label={item.name}
                        active={window.location.pathname == item.path}
                        onClick={handleCloseOffcanvas}
                      >
                        <i className={`${iconClass} text-primary`} style={{ marginRight: 5, fontSize: '1.2rem' }}></i>
                        <small>{item.name}</small>
                      </Nav.Link>
                    </LinkContainer>
                  );
                })}
                <Nav.Link onClick={() => { signOutUser(); handleCloseOffcanvas(); }}>Cerrar sesión</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login" onClick={handleCloseOffcanvas}>
                  <Nav.Link>Iniciar Sesion</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/unete" onClick={handleCloseOffcanvas}>
                  <Nav.Link>Unete al Directorio</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/ayuda" onClick={handleCloseOffcanvas}>
                  <Nav.Link>Ayuda</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas >
    </>
  );
};

export default UNPNavbar;
