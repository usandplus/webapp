import React from 'react';
import { Col, Image, Row, Stack } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

interface UNPRatingSummaryProps {
  ratings?: {
    name: string;
    rating: number;
  }[];
}

const UNPRatingSummary: React.FC<UNPRatingSummaryProps> = ({ ratings }) => {
  return (
    <Row className="">
      {
        ratings
          ? <Stack direction='vertical'>
            {
              ratings.map((rating, i) =>
                i < 5 ? <p ><FaStar className='text-primary' /> {rating.name}</p> : <></>
              )
            }
          </Stack>
          : <></>
      }
    </Row>
  );
};

export default UNPRatingSummary;
