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
  aboutMe?: boolean;
  className?: string;
  heroImages: string[]; // Array of image URLs for the hero banner
  entityInfo: {
    name: string;
    description: string;
    aboutUs?: string;
    services?: string[];
    location?: string;
    logo?: string;
    ratingSummary?: Object;
    campaigns?: {
      name: string;
      avatarURL: string;
      url: string;
    }[];
    importantPeople?: {
      name: string;
      avatarURL: string;
      description: string;
    }[];
  };
  children?: React.ReactNode; // This will be used to render additional components like analytics and reviews
}

const UNPProfileLayout: FC<UNPProfileLayoutProps> = ({
  heroImages,
  aboutMe,
  entityInfo,
  children,
  className
}) => {
  const someDataTitle = 'Product Details';
  const someDataContent = 'This product is awesome because it has a lot of amazing features.';

  return (
    <Container fluid style={{ backgroundColor: 'offwhite' }} className={`${className} px-md-5 pt-md-3`}>
      {/* Hero Section */}
      <UNPHeroGallery images={heroImages} />
      <div className='p-3'>
        <UNPStickyLayout dataTitle={someDataTitle} dataContent={someDataContent} entityInfo={entityInfo}>
          {entityInfo.aboutUs && <Row><UNPTextSection title={`${aboutMe ? 'Sobre Mi' : 'Sobre Nosotros'}`} text={entityInfo.aboutUs} /></Row>}
          {entityInfo.services && <Row><UNPServicesOffered services={entityInfo.services} /></Row>}
          {entityInfo.importantPeople && <Row><UNPImportantPeople importantPeople={entityInfo.importantPeople} /></Row>}
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
      </div>
    </Container>
  );
};

export default UNPProfileLayout;
