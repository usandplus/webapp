import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import UNPCard from './UNPCard';
import { UNPBaseType } from '../../types/models/common';
import UNPButton from './UNPButton';
import { Container, Row, Col } from 'react-bootstrap';

export interface UNPShowcaseGridProps {
  simple?: boolean;
  baseType: UNPBaseType | null;
  selectedCategory: string | null;
  title: string;
  customNavigationPrefix?: string;
  items: any[];
  mini?: boolean;
}

const UNPShowcaseGrid: React.FC<UNPShowcaseGridProps> = ({
  simple,
  title,
  customNavigationPrefix,
  items,
  selectedCategory,
  baseType,
  mini,
}) => {
  const navigate = useNavigate();

  // Filter items by baseType and category
  let filteredItems = baseType
    ? items.filter((item: any) => item.baseType === baseType)
    : items;

  filteredItems = selectedCategory
    ? filteredItems.filter((item: any) => item.category === selectedCategory)
    : filteredItems;

  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const visibleItems = filteredItems.slice(0, page * itemsPerPage);

  const handleCardClick = (baseType: UNPBaseType, id: string, item: any) => {
    navigate(
      `${customNavigationPrefix ? `/${customNavigationPrefix}` : ''}/${baseType}/${id}`
    );
  };

  const hasMore = filteredItems.length > visibleItems.length;

  return (<>
      <Row noGutters className=''>
        {visibleItems.map((item: any) => (
          <Col key={item.id} xs={11} md={5} lg={2} className='mb-3 mx-lg-0 mx-auto'>
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
              className="unp-card h-100"
              onClick={() => handleCardClick(item.baseType, item.id, item)}
            />
          </Col>
        ))}
      </Row>

      {hasMore && (
        <div className="d-flex justify-content-center my-4">
          <UNPButton onClick={() => setPage(page + 1)}>
            Load More
          </UNPButton>
        </div>
      )}
    </>
  );
};

export default UNPShowcaseGrid;
