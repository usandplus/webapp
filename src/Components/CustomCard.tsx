import React, { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface CustomCardProps {
  title?: string;
  subtitle?: string;
  body?: React.ReactNode;
  footer?: string | React.ReactNode;
  imgSrc?: string;
  imgAlt?: string;
  customStyles?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode | null
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  subtitle,
  body,
  footer,
  imgSrc,
  imgAlt,
  customStyles,
  onClick,
  children
}) => {
  return (
    <Card
      style={{
        backgroundColor: '#fff',
        maxWidth: 200,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        margin: 5
      }}
      onClick={onClick} >
      {imgSrc && <Card.Img variant="top" src={imgSrc} alt={imgAlt} />
      }
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {subtitle && <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>}
        {body && <Card.Text>{body}</Card.Text>}
        {children}
      </Card.Body >
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card >
  );
}

export default CustomCard;
