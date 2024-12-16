import React from "react";
import { Placeholder, Container, Row, Col } from "react-bootstrap";

const HomePlaceholder: React.FC = () => {

  const width = window.innerWidth;

  const CardPlaceholder = () => (
    <Col className="mb-4">
      <div className="border p-2 h-100" style={{ borderRadius: '0.5rem' }}>
        {/* Image placeholder */}
        <Placeholder as="div" animation="wave" className="d-none d-lg-block w-100 mb-2" style={{ height: '10em' }}>
          <Placeholder xs={12} style={{ height: '100%', borderRadius: '0.5rem' }} />
        </Placeholder>
        <Placeholder as="div" animation="wave" className="d-block d-lg-none w-100 mb-2" style={{ height: '300px' }}>
          <Placeholder xs={12} style={{ height: '100%', borderRadius: '0.5rem' }} />
        </Placeholder>

        {/* Title placeholder */}
        <Placeholder as="h5" animation="wave" className="mb-1">
          <Placeholder xs={6} />
        </Placeholder>

        {/* Rating placeholder */}
        <Placeholder as="div" animation="wave" className="d-flex align-items-center mb-1">
          <Placeholder xs={2} />
        </Placeholder>

        {/* Description placeholder */}
        <Placeholder as="p" animation="wave">
          <Placeholder xs={10} className="mb-1" />
          <Placeholder xs={8} />
        </Placeholder>
      </div>
    </Col>
  );

  const desktopPlaceholder = () => {
    return (
      <Container fluid className="mt-3">
        {/* Search bar placeholder */}
        <Row className="mb-4 justify-content-center">
          <Col xs={12} md={6}>
            <Placeholder as="div" animation="wave">
              <Placeholder xs={12} style={{ height: '40px', borderRadius: '0.5rem' }} />
            </Placeholder>
          </Col>
        </Row>

        {/* Categories placeholder */}
        <Row className="mb-4 overflow-hidden justify-content-center">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Col key={idx} xs={1} className="text-center">
              <Placeholder as="div" animation="wave" className="mb-2 mx-auto" style={{ width: '40px', height: 'auto', borderRadius: '50%' }}>
                <Placeholder xs={12} style={{ borderRadius: '50%' }} />
              </Placeholder>
              <Placeholder as="div" animation="wave">
                <Placeholder xs={8} className="mx-auto" />
              </Placeholder>
            </Col>
          ))}
        </Row>

        {/* Card Grid */}
        <Row>
          {Array.from({ length: 12 }).map((_, idx) => (
            <Col xs={2}>
            <CardPlaceholder key={idx} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  const mobilePlaceholder = () => {
    return (
      <Container fluid className="mt-3">

        {/* Search bar placeholder */}
        <Row className="mb-3 justify-content-center">
          <Col xs={10}>
            <Placeholder as="div" animation="wave">
              <Placeholder xs={12} style={{ height: '40px', borderRadius: '0.5rem' }} />
            </Placeholder>
          </Col>
        </Row>

        {/* Categories placeholder (scrollable horizontally if desired) */}
        <Row className="mb-3 justify-content-center" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} style={{ display: 'inline-block', width: '60px', marginRight: '10px', textAlign: 'center' }}>
              <Placeholder as="div" animation="wave" className="mb-2 mx-auto" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                <Placeholder xs={12} style={{ borderRadius: '50%' }} />
              </Placeholder>
              <Placeholder as="div" animation="wave">
                <Placeholder xs={8} className="mx-auto" />
              </Placeholder>
            </div>
          ))}
        </Row>

        {/* Cards in a single column */}
        <Row className=' justify-content-center'>
          {Array.from({ length: 8 }).map((_, idx) => (
            <Col xs={11}>
            <CardPlaceholder key={idx} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  const renderPlaceholder = () => {
    if (width >= 992) {
      return desktopPlaceholder();
    } else {
      return mobilePlaceholder();
    }
  };

  return renderPlaceholder();
};

export default HomePlaceholder;
