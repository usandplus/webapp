import React, { useState } from 'react';
import { Card, CardProps, Row, Col, Image, Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { UNPBaseType, UNPBaseCategory } from '../../types/models/common';
import styles from '../../Utils/styles.json';

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
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars).fill(<FaStar className="text-primary" />)}
        {halfStar === 1 && <FaStarHalfAlt className="text-primary" />}
        {Array(emptyStars).fill(<FaRegStar className="text-primary" />)}
      </>
    );
  };

  const miniCardStyle = {
    maxWidth: '150px',
    maxHeight: '200px',
    border: 1,
    backgroundColor: 'offwhite',
    cursor: 'pointer',
    // borderRadius: 5
  };

  const normalCardStyle = {
    border: 'none',
    backgroundColor: 'offwhite',
    cursor: 'pointer',
  };

  let roundedRating = rating.toString().slice(0, 3)

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
        <><Card.Title>
          <Image
            className="d-block w-100 rounded"
            src={imgURL}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: 4 / 3
            }}
            alt="Main image"
          />
        </Card.Title>
          <Card.Body className="pt-2 px-0">
            <Row className="">
              <Col xs={8} className="">
                <Row>
                    <Card.Text className="mb-0 text-primary d-none d-md-flex">{title}</Card.Text>
                    <h1 className="mb-0 text-primary d-flex d-md-none">{title}</h1>
                </Row>
                {!simple && (
                  <Row className=''>
                    <Card.Text className=" d-flex align-items-center justify-content-start  ">
                      {renderStars()}
                      {roundedRating}
                    </Card.Text>

                  </Row>
                )}
              </Col>
              <Col xs={4} className='text-end text-md-center px-0'>
                <Image
                  className=""
                  src={profileImgURL}
                  roundedCircle
                  style={{
                    width: '60%',
                    height: 'auto',
                    objectFit: 'cover',
                    aspectRatio: 1
                  }}
                />
              </Col>
            </Row>
            {!simple && (
              <>
                <Card.Text className="mt-2">{description}</Card.Text>
              </>
            )}
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default UNPCard;
