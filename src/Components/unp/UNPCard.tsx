import React, { useState } from 'react';
import { Card, CardProps, Row, Col, Image, Carousel } from 'react-bootstrap';
import { UNPBaseType, UNPBaseCategory } from '../../types/models/common';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Icons for arrows

interface UNPCardProps extends CardProps {
  mini?: boolean;  // New prop to determine if it's the mini version
  simple?: boolean;
  title: string;
  description: string;
  imgURL: string; // Main image URL
  profileImgURL: string; // Profile image URL
  rating: number;
  baseType: UNPBaseType;
  category: any;
  clientId: string;
  number: number; // Number of volunteers
  numberTitle: string;
  onClick?: () => void; // Add onClick prop
}

const UNPCard: React.FC<UNPCardProps> = ({
  mini,  // Added mini prop
  simple,
  title,
  description,
  imgURL,
  profileImgURL,
  rating,
  baseType,
  category,
  onClick,
  clientId,
  number,
  numberTitle,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Manage carousel state

  // Handle carousel control clicks without stopping propagation
  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? 2 : prevIndex - 1 // Loop carousel
    );
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prevIndex) =>
      prevIndex === 2 ? 0 : prevIndex + 1 // Loop carousel
    );
  };

  // Mini version dimensions
  const miniCardStyle = {
    maxWidth: '150px',
    maxHeight: '200px',
    border: 1,
    backgroundColor: 'offwhite',
    cursor: 'pointer',
  };

  // Normal version dimensions
  const normalCardStyle = {
    maxWidth: '300px',
    border: 'none',
    backgroundColor: 'offwhite',
    cursor: 'pointer',
  };

  // Mini version image style (occupying the top third of the mini card)

  const fixedHeight = 300; // Set a consistent height for the carousel items

  return (
    <Card
      {...props}
      onClick={onClick} // Trigger card onClick only when clicking outside of the carousel arrows
      style={mini ? miniCardStyle : normalCardStyle}  // Apply mini card styles if mini is true
      className={`unp-card ${props.className || ''}`}
    >
      {mini ? (
        // Mini Version
          <div className='border'>
          <div >
            <img
              src={imgURL}
              alt="Top image"
              style={{
                height: '50px',
                width: '100%',
                objectFit: 'cover',
              }} // Apply mini image style
            />
          </div>
          <div style={{ backgroundColor: 'white', padding: '5px' }}>
            <h4 className="text-center">{title}</h4>
            <p className="text-center small">{description}</p>
          </div>
          </div>
      ) : (
        // Full Version
        <>
          <Carousel
            activeIndex={activeIndex}
            variant="dark"
            onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
            interval={null} // Disable auto-slide
            indicators={false} // No indicators for simple version
            prevIcon={
              simple ? (
                <></>
              ) : (
                <span
                  onClick={handlePrevClick} // Navigate to the previous slide
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '50%',
                    padding: '10px',
                    color: 'white',
                    zIndex: 2, // Ensure arrows stay on top
                    position: 'relative',
                  }}
                >
                  <FaChevronLeft />
                </span>
              )
            }
            nextIcon={
              simple ? (
                <></>
              ) : (
                <span
                  onClick={handleNextClick} // Navigate to the next slide
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '50%',
                    padding: '10px',
                    color: 'white',
                    zIndex: 2, // Ensure arrows stay on top
                    position: 'relative',
                  }}
                >
                  <FaChevronRight />
                </span>
              )
            }
          >
            {/* First Carousel Item - Image */}
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imgURL}
                alt="Main image"
                style={{
                  height: `${fixedHeight}px`, // Set a fixed height
                  objectFit: 'cover',
                }}
              />
            </Carousel.Item>

            {/* Second Carousel Item - Custom Component 1 */}
            <Carousel.Item>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{
                  height: `${fixedHeight}px`, // Set the same fixed height
                  backgroundColor: '#f8f9fa',
                }}
              >
                <h6>Base Type: {baseType}</h6>
                <h6>Category: {category}</h6>
              </div>
            </Carousel.Item>

            {/* Third Carousel Item - Custom Component 2 */}
            <Carousel.Item>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{
                  height: `${fixedHeight}px`, // Set the same fixed height
                  backgroundColor: '#f8f9fa',
                }}
              >
                <h6>{number} Volunteers</h6>
                <h6>{numberTitle}</h6>
              </div>
            </Carousel.Item>
          </Carousel>

          <Card.Body>
            <Row className="align-items-center">
              <Col xs={2} className="p-0">
                <Image
                  src={profileImgURL}
                  roundedCircle
                  style={{ width: '100%', height: 'auto' }}
                />
              </Col>

              <Col xs={10} className="ps-2">
                <Row>
                  <h5 className="mb-0">{title}</h5>
                </Row>
                {simple ? (
                  <></>
                ) : (
                  <Row>
                    <p className="mb-0">Rating: {rating}</p>
                  </Row>
                )}
              </Col>
            </Row>
            {simple ? (
              <></>
            ) : (
              <>
                <Card.Text className="mt-2">{description}</Card.Text>
                <Row>
                  <Col>
                    <p className="mb-0">
                      {number} <span className="fw-normal">{numberTitle}</span>
                    </p>
                  </Col>
                </Row>
              </>
            )}
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default UNPCard;
