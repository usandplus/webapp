import React, { useState } from 'react';
import { Card, CardProps, Row, Col, Image, Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { UNPBaseType, UNPBaseCategory } from '../../types/models/common';
import UNPButton from './UNPButton';
import styles from '../../Utils/styles.json'
interface UNPCardProps extends CardProps {
  mini?: boolean;
  simple?: boolean;
  title: string;
  description: string;
  imgURL: string;
  profileImgURL: string;
  rating: number;
  baseType: UNPBaseType;
  category: any;
  clientId: string;
  number: number;
  numberTitle: string;
  onClick?: () => void;
}

const UNPCard: React.FC<UNPCardProps> = ({
  mini,
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
  const [activeIndex, setActiveIndex] = useState(0);
  const handlePrevClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  // Helper function to render stars based on the rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars).fill(<FaStar color={styles.palette.primary.main} />)}
        {halfStar === 1 && <FaStarHalfAlt color={styles.palette.primary.main} />}
        {Array(emptyStars).fill(<FaRegStar color={styles.palette.primary.main} />)}
      </>
    );
  };

  const miniCardStyle = {
    maxWidth: '150px',
    maxHeight: '200px',
    border: 1,
    backgroundColor: 'offwhite',
    cursor: 'pointer',
  };

  const normalCardStyle = {
    maxWidth: '300px',
    border: 'none',
    backgroundColor: 'offwhite',
    cursor: 'pointer',
  };

  const fixedHeight = 300;

  return (
    <Card
      {...props}
      onClick={onClick}
      style={mini ? miniCardStyle : normalCardStyle}
      className={`unp-card ${props.className || ''}`}
    >
      {mini ? (
        <div className='border'>
          <div>
            <img
              src={imgURL}
              alt="Top image"
              style={{
                height: '50px',
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <div style={{ backgroundColor: 'white', padding: '5px' }}>
            <h4 className="text-center">{title}</h4>
            <p className="text-center small">{description}</p>
          </div>
        </div>
      ) : (
        <>
          <Carousel
            activeIndex={activeIndex}
            variant="dark"
            onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
            interval={null}
            indicators={false}
            prevIcon={
              simple ? (
                <></>
              ) : (
                <UNPButton
                  onClick={handlePrevClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'rgba(129, 55, 255, 0.75)',
                    borderRadius: '50%',
                    color: 'white',
                    zIndex: 2,
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '15px',
                    minWidth: '10px'
                  }}
                >
                  <FaChevronLeft />
                </UNPButton>
              )
            }
            nextIcon={
              simple ? (
                <></>
              ) : (
                <UNPButton
                  onClick={handleNextClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'rgba(129, 55, 255, 0.75)',
                    borderRadius: '50%',
                    color: 'white',
                    zIndex: 2,
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                    minWidth: '10px'
                  }}
                >
                  <FaChevronRight />
                </UNPButton>
              )
            }
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imgURL}
                alt="Main image"
                style={{
                  height: `${fixedHeight}px`,
                }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{
                  height: `${fixedHeight}px`,
                  backgroundColor: '#f8f9fa',
                }}
              >
                <h6>Base Type: {baseType}</h6>
                <h6>Category: {category}</h6>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{
                  height: `${fixedHeight}px`,
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
                {!simple && (
                  <Row>
                    <div className="d-flex align-items-center">
                      {renderStars()}{rating}
                    </div>
                  </Row>
                )}
              </Col>
            </Row>
            {!simple && (
              <>
                <Card.Text className="mt-2">{description}</Card.Text>
                {/* <Row>
                  <Col>
                    <p className="mb-0">
                      {number} <span className="fw-normal">{numberTitle}</span>
                    </p>
                  </Col>
                </Row> */}
              </>
            )}
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default UNPCard;
