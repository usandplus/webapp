import React, { useState } from 'react';
import { Container, Row, Col, Image, Carousel, Navbar, Placeholder } from 'react-bootstrap';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface UNPHeroGalleryProps {
  images: string[];
}

const UNPHeroGallery: React.FC<UNPHeroGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (selectedIndex: number) => {
    setCurrentImageIndex(selectedIndex);
  };

  const handleLeftIconClick = () => {
    navigate(-1);
  };

  const handleRightIconClick = () => {
    setFavorite(!favorite);
  };

  const renderMainImage = () => {
    if (images.length === 0 || !images[currentImageIndex]) {
      return (
        <Placeholder as="div" animation="glow" className="w-100 h-100">
          <Placeholder xs={12} style={{ height: '500px', borderRadius: '0.3rem' }} />
        </Placeholder>
      );
    }

    return (
      <Image
        src={images[currentImageIndex]}
        alt={`Gallery image ${currentImageIndex + 1}`}
        fluid
        rounded
        className="w-100 h-100 object-fit-cover shadow-lg"
        style={{ maxHeight: '500px' }}
      />
    );
  };

  const renderThumbnail = (img: string, idx: number) => {
    if (!img) {
      return (
        <div key={idx} className="p-2" style={{ width: '50%' }}>
          <Placeholder as="div" animation="glow">
            <Placeholder xs={12} style={{ width: '100%', height: '150px', borderRadius: '0.3rem' }} />
          </Placeholder>
        </div>
      );
    }

    return (
      <div
        key={idx}
        className="p-2"
        style={{ width: '50%' }}
      >
        <div
          style={{
            width: '100%',
            height: '150px',
            overflow: 'hidden',
          }}
        >
          <Image
            src={img}
            alt={`Thumbnail image ${idx + 1}`}
            fluid
            rounded
            className="object-fit-cover w-100 h-100 shadow"
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentImageIndex(idx)}
          />
        </div>
      </div>
    );
  };

  const renderThumbnailsSection = () => {
    // If no images are available, show a few placeholder thumbnails
    if (images.length === 0) {
      const placeholdersCount = 6; 
      return (
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {Array.from({ length: placeholdersCount }).map((_, idx) => (
            <div key={idx} className="p-2" style={{ width: '50%' }}>
              <Placeholder key={idx} as="div" animation="glow">
                <Placeholder xs={12} style={{ width: '100%', height: '150px', borderRadius: '0.3rem' }} />
              </Placeholder>
            </div>
          ))}
        </div>
      );
    }

    // If images are available, render them as usual
    return (
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {images.slice(0, 6).map((img, idx) => renderThumbnail(img, idx))}
      </div>
    );
  };

  const renderCarousel = () => {
    if (images.length === 0) {
      // If no images, show a single placeholder slide
      return (
        <Carousel
          activeIndex={0}
          controls={false}
          indicators={false}
          className="d-lg-none"
        >
          <Carousel.Item>
            <Placeholder as="div" animation="glow" className="w-100 h-100">
              <Placeholder xs={12} style={{ width: '100%', height: '50vh' }} />
            </Placeholder>
          </Carousel.Item>
        </Carousel>
      );
    }

    // Otherwise, render the actual images
    return (
      <Carousel
        activeIndex={currentImageIndex}
        onSelect={handleSelect}
        controls={false}
        indicators={true}
        interval={5000}
        className="d-lg-none"
      >
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            {img ? (
              <Image
                src={img}
                alt={`Gallery image ${idx + 1}`}
                fluid
                className="w-100 object-fit-cover"
                style={{ height: '50vh' }}
              />
            ) : (
              <Placeholder as="div" animation="glow" className="w-100 h-100">
                <Placeholder xs={12} style={{ width: '100%', height: '50vh', borderRadius: '0.3rem' }} />
              </Placeholder>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  return (
    <Container fluid className="unp-hero-gallery px-md-5">
      {/* Mobile Navbar */}
      <Navbar className="d-md-none bg-light shadow py-2 pl-3">
        <Navbar.Brand onClick={handleLeftIconClick} style={{ cursor: 'pointer', marginLeft: '25px' }}>
          <Navbar.Text className="ml-auto">
            <FaArrowLeft size={20} className="text-primary" />
          </Navbar.Text>
        </Navbar.Brand>
        <Navbar.Text className="mx-auto"></Navbar.Text>
        <Navbar.Brand onClick={handleRightIconClick} style={{ cursor: 'pointer' }}>
          {
            favorite
              ? <BiSolidHeart size={20} className="text-danger" />
              : <BiHeart size={20} className="text-primary" />
          }
        </Navbar.Brand>
      </Navbar>

      {/* Desktop View (Two-column layout) */}
      <Row
        className="d-none d-lg-flex align-items-center"
        style={{ height: '500px' }}
      >
        <Col md={7} className="d-flex align-items-center justify-content-center">
          {renderMainImage()}
        </Col>
        <Col md={5} className="d-flex align-items-center justify-content-center">
          {renderThumbnailsSection()}
        </Col>
      </Row>

      {/* Mobile View (Carousel) */}
      {renderCarousel()}
    </Container>
  );
};

export default UNPHeroGallery;
