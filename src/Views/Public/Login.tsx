import React, { useEffect } from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from '../../firebase/auth/AuthProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login: React.FC = () => {
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect')

  useEffect(()=>{
    if (user) 
      if (redirect) navigate(redirect)
        else navigate('/dashboard')
  },[user])

  return (
    <Container fluid className="d-flex justify-content-center align-items-center mt-5">
      <Row className="w-100 justify-content-center">
        <Col sm={12} md={8} lg={6} xl={4}>
          <Card className="shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Inicia Sesion</h3>
              <Form>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Correo Electronico</Form.Label>
                  <Form.Control type="email" placeholder="ejemplo@usandplus.io" />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" />
                </Form.Group>
                <Button variant="primary" className="w-100 mb-3" type="submit">
                  Iniciar Sesion
                </Button>
              </Form>
              <div className="text-center my-3">
                <span className="text-muted">o inicia sesion con</span>
              </div>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="lg">
                  <i className="bi bi-google me-2"></i> Google
                </Button>
                <Button variant="outline-primary" size="lg">
                  <i className="bi bi-facebook me-2"></i> Facebook
                </Button>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <small className="text-muted">
                No tienes una cuenta? <a href="/signup">Crea una ahora</a>
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
