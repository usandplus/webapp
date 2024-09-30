import { ListGroup, ProgressBar, CloseButton, Button, Col, Card, Container, Image, Row, Badge } from 'react-bootstrap';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

interface StarRatingsProps {
  rating?: number;
  single?: boolean;
}

const StarRatings: FC<StarRatingsProps> = ({ rating, single }) => {
  let emptyStar = <i className="fa-regular fa-star"></i>
  let fullStar = <i className="fa-solid fa-star"></i>

  if (single) {
    return fullStar
  }
  if (rating) {
    let result = null
    for (let i = 0; i < Math.floor(rating); i++) {
      result = result ? <>{result}{fullStar}</> : fullStar
    }
    if (Math.floor(rating) != 5) {
      for (let i = 0; i < 5 - Math.floor(rating); i++) {
        result = result ? <>{result}{emptyStar}</> : emptyStar
      }
    }
    return result
  }

  return <></>
}
export default StarRatings