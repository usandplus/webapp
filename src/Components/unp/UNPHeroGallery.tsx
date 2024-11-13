import React, { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import UNPButton from './UNPButton';

interface UNPHeroGalleryProps {
  images: string[]; // Array of image URLs
}

const UNPHeroGallery: React.FC<UNPHeroGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle the next and previous image for mobile view
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container fluid className="p-3">
      {/* Desktop View (Two-column layout) */}
      <Row className="d-none d-md-flex">
        <Col md={7} className="d-flex align-items-center justify-content-center">
          <Image src={images[currentImageIndex]} fluid className="w-100 h-100" style={{ maxHeight: '500px' }} />
        </Col>
        <Col md={5}>
          <Row>
            {images.slice(0, 6).map((img, idx) => (
              <Col key={idx} xs={6} className="mb-3">
                <Image
                  src={img}
                  fluid
                  onClick={() => setCurrentImageIndex(idx)}
                  style={{ cursor: 'pointer', maxHeight: '150px' }}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Mobile View (Single-image layout with arrows) */}
      <div className="d-md-none position-relative">
        <Image
          src={images[currentImageIndex]}
          fluid
          style={{ width: '100%', height: '50vh' }}
        />
        <UNPButton
          variant="light"
          className="position-absolute top-50 start-0 translate-middle-y"
          onClick={handlePrev}
        >
          &#8249;
        </UNPButton>
        <UNPButton
          variant="light"
          className="position-absolute top-50 end-0 translate-middle-y"
          onClick={handleNext}
        >
          &#8250;
        </UNPButton>
      </div>
    </Container>
  );
};

export default UNPHeroGallery;
