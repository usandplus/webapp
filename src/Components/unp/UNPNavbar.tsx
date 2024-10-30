// src/components/unp/UNPNavbar.tsx

import React from 'react';
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { signInWithGoogle, signOutUser } from '../../firebase/auth/authService';

interface UNPNavbarProps {
  // Additional custom props if necessary
  links?: { name: string; path: string }[];
}

const UNPNavbar: React.FC<UNPNavbarProps> = ({ links }) => {
  const currentUser = {displayName: 'Test 1'}
  const fixed_links: UNPNavbarProps["links"] = [
    {name: "Directorio", path: "/"},
    {name: "Showroom", path: "/showroom"},
    {name: "Dashboard", path: "/dashboard"},
  ]
  return (
    <Navbar bg="white" variant="light" expand="lg" className="unp-navbar">
      <Container>
        <Navbar.Brand href="/">
            <Image
              alt=""
              src="/isotype.png"
              className="d-inline-block align-top"
              height={32}
            />
            <Image
              alt=""
              src="/name_rectangle.png"
              className="d-inline-block align-top"
              width={150}
            /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {fixed_links.map((link) => (
              <Nav.Link key={link.name} href={link.path}>
                {link.name}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="">
          <Nav.Item>
          <NavDropdown
            id="navbarpill"
            className=""
            title={
              <Image
                roundedCircle
                style={{ width: 30, height: 30 }}
                src={'/lady.jpg'}
                alt={currentUser?.displayName}
              />
            }
          >
            <NavDropdown.Divider className="d-md-none" />
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
            {currentUser
              ?
              <NavDropdown.Item onClick={() => signOutUser()}>
                Cerrar sesión
              </NavDropdown.Item>
              :
              <NavDropdown.Item onClick={() => signInWithGoogle()}>
                Iniciar sesión
              </NavDropdown.Item>
            }
          </NavDropdown>
        </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UNPNavbar;
