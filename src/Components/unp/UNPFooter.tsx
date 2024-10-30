// src/components/unp/UNPFooter.tsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const UNPFooter: React.FC = () => {
  return (
    <footer className="unp-footer">
      <Container>
        <Row>
          <Col>
            <p>© 2024 MyCompany. All rights reserved.</p>
          </Col>
          <Col className="text-end">
            <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default UNPFooter;
