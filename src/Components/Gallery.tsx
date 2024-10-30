// src/components/Gallery.tsx
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

interface GalleryProps {
  images: { url: string; altText?: string }[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Container className="my-4">
      <Row>
        {images.map((image, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-3">
            <Image src={image.url} alt={image.altText} fluid rounded />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
