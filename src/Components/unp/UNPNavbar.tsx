import React from 'react';
import { Navbar, Nav, Container, Image, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { signInWithGoogle, signOutUser } from '../../firebase/auth/authService';
import { useAuthContext } from '../../firebase/auth/AuthProvider';
import UNPButton from './UNPButton';
import { useNavigate } from 'react-router-dom';

interface UNPNavbarProps {
  links?: { name: string; path: string; external?: boolean; }[];
}

const UNPNavbar: React.FC<UNPNavbarProps> = ({ links }) => {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const fixed_links: UNPNavbarProps["links"] = [
    { name: "Directorio", path: "/" },
    { name: "Showroom", path: "/showroom" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <Navbar bg="white" variant="light" expand="lg" className="unp-navbar">
      <Container>
        <Navbar.Brand href="/">
          <Image alt="" src="/isotype.png" className="d-inline-block align-top" height={32} />
          <Image alt="" src="/name_rectangle.png" className="d-inline-block align-top" width={150} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <UNPButton variant="primary" onClick={() => navigate('/unete')}>
              Unete al directorio
            </UNPButton>
            {fixed_links.map((link) => (
              link.external ?
                <a href={link.path}>{link.name}</a>
                :
                <Nav.Link key={link.name} href={link.path} className='navbar-link text-primary'>
                  {link.name}
                </Nav.Link>
            ))}
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown
                id="profile-dropdown"
                align="end"
                title={
                  <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <Image
                      roundedCircle
                      style={{ width: 30, height: 30 }}
                      src={user.photoURL || '/default-profile.png'}
                      alt={user.displayName || 'Profile'}
                    />
                    <i className="bi bi-chevron-down ms-1"></i>
                  </div>
                }
              >
                <LinkContainer to="/perfil">
                  <NavDropdown.Item>Perfil</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/perfil">
                  <NavDropdown.Item>Mensajes</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/ayuda">
                  <NavDropdown.Item>Ayuda</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={() => signOutUser()}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <UNPButton variant="primary" onClick={()=>navigate('/login')}>
                Iniciar sesión
              </UNPButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UNPNavbar;
