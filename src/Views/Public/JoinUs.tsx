import React, { useState } from 'react';
import { Card, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import UNPTextSection from '../../Components/unp/UNPTextSection';
import { useNavigate } from 'react-router-dom';

type SubscriptionOption = {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  link: string;
};

const JoinUs: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigate = useNavigate()

  const options: SubscriptionOption[] = [
    {
      id: 1,
      title: 'Persona Fisica',
      description: 'A great plan for personal use. Get started with all the essentials.',
      price: '$9.99/month',
      features: ['Access to basic features', '1 user account', 'Email support'],
      link: 'https://empresa.usandplus.io/fisica'
    },
    {
      id: 2,
      title: 'Asociacion Civil',
      description: 'Perfect for professionals who need advanced tools and features.',
      price: '$19.99/month',
      features: ['Access to all features', '5 user accounts', 'Priority support', 'Analytics tools'],
      link: 'https://empresa.usandplus.io/ac'
    },
    {
      id: 3,
      title: 'Fundaciones',
      description: 'Exclusivo para donatarias autorizadas ante el SAT.',
      price: '$49.99/month',
      features: ['Custom integrations', 'Unlimited users', 'Dedicated account manager', '24/7 support'],
      link: 'https://empresa.usandplus.io/fundaciones'
    },
    {
      id: 4,
      title: 'Empresa',
      description: 'Ideal for large organizations with advanced needs.',
      price: '$49.99/month',
      features: ['Custom integrations', 'Unlimited users', 'Dedicated account manager', '24/7 support'],
      link: 'https://empresa.usandplus.io/empresas'
    },
  ];

  const handleSelect = (link: string) => {
    window.location.href = link;
  };

  return (
    <Container className="pt-5">
      <Button variant='primary'>test</Button>
      <UNPTextSection title='Unete a Us & Plus' text='Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum' />
      <Row className="justify-content-center">
        {options.map(option => (
          <Col key={option.id} sm={12} md={6} lg={4} className="mb-4">
            <Card
              className={`h-100 shadow-lg ${selectedOption === option.id ? 'border-primary' : 'border-light'
                }`}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                ...(selectedOption === option.id && { transform: 'scale(1.05)' }),
              }}
              onClick={() => handleSelect(option.link)}
            >
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center text-primary fw-bold mb-3">{option.title}</Card.Title>
                <Card.Text className="text-center text-muted">{option.description}</Card.Text>
                <div className="mt-3">
                  <h5 className="text-primary fw-bold">Features:</h5>
                  <ListGroup variant="flush">
                    {option.features.map((feature, idx) => (
                      <ListGroup.Item key={idx} className="border-0 ps-0">
                        <i className="bi bi-check-circle text-success me-2"></i>
                        {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
                <div className="mt-auto">
                  <Card.Text className="text-center display-6 fw-bold text-primary">
                    {option.price}
                  </Card.Text>
                  <Button
                    variant={selectedOption === option.id ? 'primary' : 'outline-primary'}
                    className="w-100"
                  >
                    {selectedOption === option.id ? 'Seleccionada' : 'Selecciona'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JoinUs;
