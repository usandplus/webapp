import React from 'react';
import { Col, Image, Row, Stack } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

interface UNPTextSectionProps {
  title: string;
  text?: string;
  border?: boolean;
}

const UNPTextSection: React.FC<UNPTextSectionProps> = ({ title, text, border= false }) => {
  return (
    <Row className={`${border ? 'border-top' : ''} py-3`}>
      <h3 className="fw-bold main-text pb-2">{title}</h3>
      {text ? <p className="text-muted">{text}</p> : <></>}
    </Row>
  );
};

export default UNPTextSection;
