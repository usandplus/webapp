import React, { useState } from 'react';
import { Card, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import UNPTextSection from '../../Components/unp/UNPTextSection';
import { useNavigate } from 'react-router-dom';
import { BiInfoCircle } from 'react-icons/bi';

type EntityOption = {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  requisites: string[];
  link: string;
};

const JoinUs: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigate = useNavigate();

  const options: EntityOption[] = [
    {
      id: 2,
      title: 'Asociacion Civil',
      description: 'Perfect for professionals who need advanced tools and features.',
      price: '$19.99/month',
      features: ['Access to all features', '5 user accounts', 'Priority support', 'Analytics tools'],
      requisites: ['RFC', 'Denominacion', 'Correo Electronico', 'Identificacion Oficial'],
      link: '/nuevaAc',
    },
    {
      id: 4,
      title: 'Empresa',
      description: 'Persona moral con fines de lucro.',
      price: '$49.99/month',
      features: ['Custom integrations', 'Unlimited users', 'Dedicated account manager', '24/7 support'],
      requisites: ['RFC', 'Denominacion', 'Correo Electronico', 'Identificacion Oficial'],
      link: '/nuevaEmpresa',
    },
    {
      id: 3,
      title: 'Fundaciones',
      description: 'Exclusivo para donatarias autorizadas ante el SAT.',
      price: '$49.99/month',
      features: ['Custom integrations', 'Campañas y suscripciones', 'Colaboracion con empresas', '0% comision'],
      requisites: ['RFC', 'Denominacion', 'Correo Electronico', 'Identificacion Oficial'],
      link: '/nuevaFundacion',
    },
  ];

  const cardStyles = [
    { backgroundColor: '#D1CFFF', border: '2px solid #8137FF', textColor: 'text-muted' }, // Light Blue, dark text
    { backgroundColor: '#D1CFFF', border: '2px solid #8137FF', textColor: 'text-muted' }, // Light Orange, dark text
    { backgroundColor: '#D1CFFF', border: '2px solid #8137FF', textColor: 'text-muted' }, // Light Green, light text
  ];

  const handleSelect = (option: number) => {
    setSelectedOption(option);
  };

  return (
    <Container className="pt-5 gx-0">
      <UNPTextSection
        title="Únete a Us & Plus"
        text="Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum"
      />
      <Row className="justify-content-center">
        {options.map((option, index) => {
          const { backgroundColor, border, textColor } = cardStyles[index % cardStyles.length];
          return (
            <Col key={option.id} xs={12} md={6} lg={4} className="g-5 mb-4">
              <Card
                className={`h-100 shadow ${selectedOption === option.id ? 'border-primary' : ''}`}
                style={{
                  backgroundColor,
                  border,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  ...(selectedOption === option.id && { transform: 'scale(1.05)' }),
                }}
                onClick={() => handleSelect(option.id)}
              >
                <Card.Body className={`d-flex flex-column ${textColor}`}>
                  <Card.Title className={`text-center fw-bold mb-3 ${textColor}`}>{option.title}</Card.Title>
                  <Card.Text className={`text-center ${textColor}`}>{option.description}</Card.Text>
                  <div className="mt-auto">
                    <h5 className={`fw-bold ${textColor}`}>Beneficios:</h5>
                    <ListGroup variant="flush" style={{ backgroundColor: 'transparent' }}>
                      {option.features.map((feature, idx) => (
                        <ListGroup.Item
                          key={idx}
                          className={`border-0 ps-0 ${textColor}`}
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <i className="bi bi-check-circle text-success me-2"></i>
                          {feature}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                  <div className="pt-3 ">
                    <h5 className={`fw-bold ${textColor}`}>Requisitos:</h5>
                    <ListGroup variant="flush" style={{ backgroundColor: 'transparent' }}>
                      {option.requisites.map((requisite, idx) => (
                        <ListGroup.Item
                          key={idx}
                          className={`border-0 ps-0 ${textColor}`}
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <BiInfoCircle /> {requisite}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                  <div className="mt-auto">
                    <Card.Text className={`text-center fw-bold ${textColor}`}>
                      {/* {option.price} */}
                    </Card.Text>
                    <Button
                      variant={selectedOption === option.id ? 'primary' : 'outline-primary'}
                      className="w-100"
                      onClick={()=>navigate(option.link)}
                    >
                      Unete Ahora
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default JoinUs;
