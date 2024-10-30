// src/components/unp/UNPShowcaseGrid.tsx
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UNPCard from './UNPCard';
import { UNPBaseCategory, UNPBaseType } from '../../types/models/common';

export interface UNPShowcaseGridProps {
  simple?: boolean;
  baseType: UNPBaseType | null;
  selectedCategory: string | null; // Allow null for selectedCategory
  title: string;
  customNavigationPrefix?: string;
  items: any;
  mini?: boolean;
  // {
  //   id: string; // Unique identifier for the item
  //   title: string; // Title of the card
  //   description: string; // Description for the card
  //   imgURL: string; // Image URL for the card
  //   rating: number; // Rating for the card
  //   category: UNPBaseCategory; // Category for the card
  //   clientId: string; // Unique ID for the client
  //   number: number;
  //   numberTitle: string;
  //   profileImgURL: string;
  //   baseType: UNPBaseType;
  // }[]
}

const UNPShowcaseGrid: React.FC<UNPShowcaseGridProps> = ({ simple, title, customNavigationPrefix, items, selectedCategory, baseType, mini }) => {
  // Filter items based on the selected category
  // Filter items based on the selected baseType and category
  let typeItems = baseType
    ? items.filter((item: any) => item.baseType === baseType) // Use '===' for comparison
    : items;

  typeItems = selectedCategory
    ? typeItems.filter((item: any) => item.category === selectedCategory)
    : typeItems;

  const navigate = useNavigate(); // Hook for navigation
  console.log(baseType, typeItems)

  // Handle card click to navigate to the specific route
  const handleCardClick = (baseType: UNPBaseType, id: string, item: any) => {
    console.log(item)
    navigate(`${ customNavigationPrefix ? `/${customNavigationPrefix}` : ``}/${baseType}/${id}`); // Navigate to the dynamic route
  };
  return (
    <div className="showcase-grid shadow-lg p-3 mt-5" style={{ backgroundColor: 'white', borderRadius: 15}}>
      <h3 className="mb-3">{title}</h3>
      <Row className="overflow-auto mx-auto flex-nowrap">
        {typeItems.map((item: any) => (
          <Col xs={11} md={6} lg={5} xl={4} xxl={3} key={item.id} className="p-1">
            <UNPCard
              mini={mini}
              simple={simple}
              baseType={item.baseType}
              numberTitle={item.numberTitle}
              number={item.number}
              profileImgURL={item.profileImgURL}
              title={item.title}
              description={item.description}
              imgURL={item.imgURL}
              rating={item.rating}
              category={item.category}
              clientId={item.clientId}
              className="unp-card"
              onClick={() => handleCardClick(item.baseType, item.id, item)} // Add onClick to navigate
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UNPShowcaseGrid;
