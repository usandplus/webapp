import React, { FC } from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useFirebase } from './Firebase';

interface IProps {
  className?: string;
}

const NavbarComponent: FC<IProps> = ({ className }) => {
  const currentUser = useFirebase()?.currentUser;
  const signOutFromGoogle = useFirebase()?.signOutFromGoogle;
  const signInWithGoogle = useFirebase()?.signInWithGoogle;
  console.log(className)
  return (
    <Navbar bg="white" variant="light" className='d-none d-md-flex  px-5' >
      <Nav className="justify-content-start">
        <LinkContainer to="/">
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
            />
          </Navbar.Brand>
        </LinkContainer>
      </Nav>
      <Nav className="justify-content-end w-100 align-items-center">
        <LinkContainer to="/nuevaFundacion" className="d-none d-md-block">
          <Nav.Link>
            Fundaciones
          </Nav.Link>
        </LinkContainer>
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
              <NavDropdown.Item onClick={() => signOutFromGoogle()}>
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
    </Navbar >
  );
}

export default NavbarComponent;
