import React, { FC } from 'react';
import { Container, Row, Col, Image, Badge, Card, Navbar } from 'react-bootstrap';
import UNPHeroGallery from './UNPHeroGallery';
import UNPStickyLayout from './UNPStickyLayout';
import UNPReviews from './UNPReviews';

interface UNPProfileLayoutProps {
  heroImages: string[]; // Array of image URLs for the hero banner
  entityInfo: {
    name: string;
    description: string;
    history: string;
    locationAddress: string;
    logo?: string;
  };
  children?: React.ReactNode; // This will be used to render additional components like analytics and reviews
}

const UNPProfileLayout: FC<UNPProfileLayoutProps> = ({
  heroImages,
  entityInfo,
  children,
}) => {
  const someDataTitle = 'Product Details';
  const someDataContent = 'This product is awesome because it has a lot of amazing features.';

  return (
    <Container fluid   style={{backgroundColor: 'offwhite'}}>
      {/* Hero Section */}
      <UNPHeroGallery images={heroImages} />
      <UNPStickyLayout dataTitle={someDataTitle} dataContent={someDataContent}>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
        <div>
          <h2>Left Column Content</h2>
          <p>This is the content that will appear on the left column and scrolls with the page.</p>
          <p>Feel free to add more content here!</p>
        </div>
      </UNPStickyLayout>
      {/* Main Info Section */}
      {/* <Row className="p-4">
        <Col md={7} className="scrollable-column">
          <h1>{entityInfo.name}</h1>
          <p>{entityInfo.description}</p>
          <h3>History</h3>
          <p>{entityInfo.history}</p>
          <h3>Location</h3>
          <p>{entityInfo.locationAddress}</p>
        </Col>
        <Col md={5} className="static-column">
          <Card className="info-card">
            {entityInfo.logo && (
              <Card.Img variant="top" src={entityInfo.logo} />
            )}
            <Card.Body>
              <Card.Title>{entityInfo.name}</Card.Title>
              <Card.Text>{entityInfo.description}</Card.Text>
              <Badge bg="secondary">More Info</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}

      {/* Additional Sections */}
      <Row className="mt-4">
        <Col>
          {children} {/* This will render analytics, reviews, etc. */}
        </Col>
      </Row>

      {/* Bottom Navbar for small screens */}
      <Navbar className="d-block d-md-none">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Brand href="#analytics">Analytics</Navbar.Brand>
        <Navbar.Brand href="#reviews">Reviews</Navbar.Brand>
      </Navbar>
    </Container>
  );
};

export default UNPProfileLayout;
