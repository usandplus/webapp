import React, { useState, ChangeEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ClientProps } from '../Public/Client';
import UNPButton from '../../Components/unp/UNPButton';

export const defaultClientProps: ClientProps = {
  amount_reviews: 0,
  description: '',
  details: '',
  // featuresAll: [],
  // featuresMain: [],
  // images: [],
  label: '',
  locationAddress: '',
  // location: [],
  logo: {alt: '', src: ''},
  // metrics: [],
  name: '',
  // ratings: [],
  // reasons: [],
  // reviews: [],
  shortDescription: '',
  stripeURL: ''
};

const ClientProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<ClientProps>(defaultClientProps);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You'd handle form submission here, e.g., send data to an API
  };

  const clientPropsKeys = Object.keys(formData) as (keyof ClientProps)[];
  console.log(formData)
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {clientPropsKeys.length > 0 ? (
          clientPropsKeys.map((key) => (
            <Form.Group controlId={`form${key}`} key={key}>
              <Form.Label>{key}</Form.Label>
              <Form.Control
                type="text"
                name={key}
                // value={formData[key] || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
          ))
        ) : (
          <p>No form fields available</p>
        )}
        <UNPButton variant="primary" type="submit">
          Submit
        </UNPButton>
      </Form>
    </Container>
  );
};

export default ClientProfileForm;
