import React, { FC } from 'react';
import { Container, Row, Col, Image, Badge, Card, Navbar } from 'react-bootstrap';
import UNPHeroGallery from './UNPHeroGallery';
import UNPStickyLayout from './UNPStickyLayout';
import UNPReviews from './UNPReviews';
import UNPTextSection from './UNPTextSection';
import UNPImportantPeople from './UNPImportantPeople';
import UNPServicesOffered from './UNPServicesOffered';
import UNPActiveCampaigns from './UNPActiveCampaigns';
import UNPLocation from './UNPLocation';

interface UNPProfileLayoutProps {
  heroImages: string[]; // Array of image URLs for the hero banner
  entityInfo: {
    name: string;
    description: string;
    aboutUs?: string;
    services?: string[];
    history: string;
    location: string;
    logo?: string;
    ratingSummary?: Object;
    campaigns?: {
      name: string;
      avatarURL: string;
      url: string;
    }[];
    founders?: {
      name: string;
      avatarURL: string;
      description: string;
    }[];
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
    <Container fluid style={{ backgroundColor: 'offwhite' }}>
      {/* Hero Section */}
      <UNPHeroGallery images={heroImages} />
      <UNPStickyLayout dataTitle={someDataTitle} dataContent={someDataContent} entityInfo={entityInfo}>
        {entityInfo.aboutUs && <Row><UNPTextSection title='Sobre Nosotros' text={entityInfo.aboutUs} /></Row>}
        {entityInfo.services && <Row><UNPServicesOffered services={entityInfo.services} /></Row>}
        {entityInfo.founders && <Row><UNPImportantPeople founders={entityInfo.founders} /></Row>}
        {entityInfo.campaigns && <Row><UNPActiveCampaigns campaigns={entityInfo.campaigns} /></Row>}
        <Row>
          <UNPLocation locations={[{
            description: 'Test',
            lat: 152,
            lng: 1535
          }]} />
        </Row>
      </UNPStickyLayout>

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
