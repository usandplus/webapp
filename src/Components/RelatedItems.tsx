// src/components/unp/RelatedItems.tsx

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UNPCard from './unp/UNPCard'; // Assuming UNPCard is already built
import { UNPBaseType } from '../types/models/common';

interface RelatedItem {
  id: string;
  title: string;
  description: string;
  imgURL: string;
  profileImgURL: string;
  rating: number;
  baseType: UNPBaseType;
  category: string;
  clientId: string;
  number: number;
  numberTitle: string;
  onClick: () => void;
}

interface RelatedItemsProps {
  items: RelatedItem[];
}

const RelatedItems: React.FC<RelatedItemsProps> = ({ items }) => {
  return (
    <Row>
      {items.map((item) => (
        <Col key={item.id} xs={12} md={6} lg={4}>
          <UNPCard {...item} />
        </Col>
      ))}
    </Row>
  );
};

export default RelatedItems;
