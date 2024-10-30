// src/components/ContactInformation.tsx
import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

interface ContactInformationProps {
  phoneNumber?: string;
  email?: string;
  address?: string;
  websiteURL?: string;
  socialLinks?: { platform: string; url: string }[];
}

const ContactInformation: React.FC<ContactInformationProps> = ({ phoneNumber, email, address, websiteURL, socialLinks }) => {
  return (
    <Container className="my-4">
      <h4>Contact Information</h4>
      <ListGroup>
        {phoneNumber && (
          <ListGroup.Item>
            <i className="me-2" />
            {phoneNumber}
          </ListGroup.Item>
        )}
        {email && (
          <ListGroup.Item>
            <i className="me-2" />
            {email}
          </ListGroup.Item>
        )}
        {address && <ListGroup.Item>{address}</ListGroup.Item>}
        {websiteURL && (
          <ListGroup.Item>
            <i className="me-2" />
            <a href={websiteURL} target="_blank" rel="noopener noreferrer">
              {websiteURL}
            </a>
          </ListGroup.Item>
        )}
        {socialLinks?.map((social, index) => (
          <ListGroup.Item key={index}>
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              {social.platform}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ContactInformation;
