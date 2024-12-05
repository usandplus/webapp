// src/components/unp/UNPFooter.tsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const UNPFooter: React.FC = () => {
  return (
    <footer className="unp-footer">
      <Container>
        <Row>
          <Col>
            <p>© 2024 Us & Plus. Todos los derechos reservados.</p>
          </Col>
          <Col className="text-end">
            <a href="/privacy" className="text-primary">Politica de Privacidad</a> | <a href="/terms" className="text-primary">Terminos y Condiciones</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default UNPFooter;
