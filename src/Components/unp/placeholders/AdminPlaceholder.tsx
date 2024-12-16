import React from "react";
import { Container, Row, Col, Placeholder, Card } from "react-bootstrap";

const AdminPlaceholder: React.FC = () => {

  const renderSidebar = () => {
    return (
      <div className="d-flex flex-column align-items-center p-3" style={{paddingTop: 70}}>
        {/* Profile Image Placeholder */}
        <Placeholder as="div" animation="wave" className="mb-3" style={{ width: '100px', height: '100px', borderRadius: '50%' }}>
          <Placeholder xs={12} style={{ height:'100px', borderRadius: '50%' }} />
        </Placeholder>

        {/* Name Placeholder */}
        <Placeholder as="div" animation="wave" className="text-center w-75 mb-2">
          <Placeholder xs={8} />
        </Placeholder>

        {/* Dropdown Button Placeholder */}
        <Placeholder as="div" animation="wave" className="w-75 mb-4">
          <Placeholder xs={12} style={{ height: '35px', borderRadius: '0.3rem' }} />
        </Placeholder>

        {/* Nav Items Placeholder */}
        <div className="w-100">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Placeholder as="div" animation="wave" className="mb-2" style={{borderRadius: '0.3rem'}} key={idx}>
              <Placeholder xs={10} />
            </Placeholder>
          ))}
        </div>
      </div>
    );
  };

  const MissionCardPlaceholder = () => (
    <Col md={2} className="mr-2">
      <Card className="mb-3" style={{ borderRadius: '0.5rem' }}>
        <Card.Body>
          <Placeholder as={Card.Title} animation="wave" className="mb-2">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs={8} className="mb-1" />
            <Placeholder xs={5} />
          </Placeholder>
        </Card.Body>
      </Card>
    </Col>
  );

  const ContentCardPlaceholder = () => (
    <Col md={3}>
      <Card style={{ borderRadius: '0.5rem' }}>
        <Card.Body>
          <Placeholder as={Card.Title} animation="wave" className="mb-2">
            <Placeholder xs={5} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs={10} className="mb-1" />
            <Placeholder xs={8} />
          </Placeholder>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <Container fluid className="p-0" style={{ minHeight: '100vh' }}>
      <Row noGutters>
        {/* Sidebar */}
        <Col xs={12} md={2} className="bg-light" style={{ minHeight: '100vh', borderRight: '1px solid #ddd' }}>
          {renderSidebar()}
        </Col>

        {/* Main Content */}
        <Col xs={12} md={10} className="p-4">
          {/* Top Missions Row */}
          <Row className="mb-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <MissionCardPlaceholder key={idx} />
            ))}
          </Row>
          
          <Row className="g-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <ContentCardPlaceholder key={idx} />
            ))}
          </Row>

        </Col>
      </Row>
    </Container>
  );
};

export default AdminPlaceholder;
