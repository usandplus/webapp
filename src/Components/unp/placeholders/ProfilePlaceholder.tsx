import React from "react";
import { Container, Row, Col, Placeholder, Card } from "react-bootstrap";

const ProfilePlaceholder: React.FC = () => {
  
  const renderMainImagePlaceholder = () => (
    <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '20px' }}>
      <Placeholder as="div" animation="wave" style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}>
        <Placeholder xs={12} style={{ height: '100%', borderRadius: '0.5rem' }} />
      </Placeholder>
      {/* Circular Image Placeholder in bottom right corner of the main image */}
      <div style={{ position: 'absolute', bottom: '-40px', right: '20px', width: '80px', height: '80px' }}>
        <Placeholder as="div" animation="wave" style={{ width: '80px', height: '80px', borderRadius: '50%' }}>
          <Placeholder xs={12} style={{ borderRadius: '50%' }} />
        </Placeholder>
      </div>
    </div>
  );

  const renderRightSidebarPlaceholder = () => (
    <>
      {/* Thumbnails Grid */}
      <Row className="mb-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col xs={6} className="mb-3" key={idx}>
            <Placeholder as="div" animation="wave" style={{ width: '100%', height: '80px', borderRadius: '0.5rem' }}>
              <Placeholder xs={12} style={{ height: '100%', borderRadius: '0.5rem' }} />
            </Placeholder>
          </Col>
        ))}
      </Row>

      {/* Dona Ahora Card Placeholder */}
      <Card className="p-3">
        <Placeholder as={Card.Title} animation="wave" className="mb-2">
          <Placeholder xs={4} />
        </Placeholder>

        <Placeholder as="p" animation="wave" className="mb-3">
          <Placeholder xs={8} />
        </Placeholder>

        <Placeholder as={Card.Title} animation="wave" className="mb-2">
          <Placeholder xs={4} />
        </Placeholder>

        <Placeholder as="p" animation="wave" className="mb-3">
          <Placeholder xs={10} className="mb-1" />
          <Placeholder xs={6} />
        </Placeholder>

        <ul className="list-unstyled">
          {Array.from({ length: 2 }).map((_, idx) => (
            <li key={idx} className="mb-2 d-flex align-items-center">
              <Placeholder as="div" animation="wave" style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }}>
                <Placeholder xs={12} style={{ borderRadius: '50%' }} />
              </Placeholder>
              <Placeholder as="span" animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );

  const renderProfileInfoPlaceholder = () => (
    <div style={{ marginTop: '60px' }}> 
      {/* Occupation line */}
      <Placeholder as="p" animation="wave" className="mb-2">
        <Placeholder xs={6} />
      </Placeholder>

      {/* Title */}
      <Placeholder as="h2" animation="wave" className="mb-2">
        <Placeholder xs={4} />
      </Placeholder>

      {/* Location */}
      <Placeholder as="p" animation="wave" className="mb-3">
        <Placeholder xs={5} />
      </Placeholder>

      {/* Badges */}
      <div className="d-flex mb-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Placeholder as="span" animation="wave" key={idx} style={{ display: 'inline-block', marginRight: '10px' }}>
            <Placeholder xs={6} className="px-3 py-2" style={{ borderRadius: '2rem', display: 'inline-block' }} />
          </Placeholder>
        ))}
      </div>

      {/* Sobre Nosotros section */}
      <Placeholder as="h3" animation="wave" className="mb-3">
        <Placeholder xs={4} />
      </Placeholder>
      <Placeholder as="p" animation="wave" className="mb-2">
        <Placeholder xs={10} className="mb-1" />
        <Placeholder xs={8} className="mb-1" />
        <Placeholder xs={6} />
      </Placeholder>
    </div>
  );

  return (
    <Container fluid className="p-4">
      <Row>
        {/* Main Image and Content on the left */}
        <Col md={8}>
          {renderMainImagePlaceholder()}
          {renderProfileInfoPlaceholder()}
        </Col>

        {/* Sidebar on the right */}
        <Col md={4}>
          {renderRightSidebarPlaceholder()}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePlaceholder;
