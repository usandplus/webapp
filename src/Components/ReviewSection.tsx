// src/components/unp/ReviewSection.tsx

import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';

interface Review {
  reviewer: string;
  comment: string;
  rating: number;
  date: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, averageRating }) => {
  return (
    <Card>
      <Card.Body>
        <h3>Average Rating: {averageRating}</h3>
        <ListGroup variant="flush">
          {reviews.map((review, index) => (
            <ListGroup.Item key={index}>
              <h5>{review.reviewer}</h5>
              <p>{review.comment}</p>
              <small>Rating: {review.rating} | Date: {review.date}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ReviewSection;
