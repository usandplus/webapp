import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const Help = () => {
  return (
    <Container className="help-section">
      <h1>Help Center</h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How do I reset my password?</Accordion.Header>
          <Accordion.Body>
            To reset your password, go to the settings page and click on 'Change Password'.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Where can I find my purchase history?
          </Accordion.Header>
          <Accordion.Body>
            Your purchase history is available under the 'Orders' section in your account.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Where can I find my purchase history?
          </Accordion.Header>
          <Accordion.Body>
            Your purchase history is available under the 'Orders' section in your account.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Where can I find my purchase history?
          </Accordion.Header>
          <Accordion.Body>
            Your purchase history is available under the 'Orders' section in your account.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Where can I find my purchase history?
          </Accordion.Header>
          <Accordion.Body>
            Your purchase history is available under the 'Orders' section in your account.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* Add more questions as needed */}
    </Container>
  );
};

export default Help;