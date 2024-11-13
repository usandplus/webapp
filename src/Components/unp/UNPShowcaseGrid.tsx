import { useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import UNPCard from './UNPCard';
import { UNPBaseCategory, UNPBaseType } from '../../types/models/common';

export interface UNPShowcaseGridProps {
  simple?: boolean;
  baseType: UNPBaseType | null;
  selectedCategory: string | null;
  title: string;
  customNavigationPrefix?: string;
  items: any;
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
  let typeItems = baseType
    ? items.filter((item: any) => item.baseType === baseType)
    : items;

  typeItems = selectedCategory
    ? typeItems.filter((item: any) => item.category === selectedCategory)
    : typeItems;

  const navigate = useNavigate();
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const handleScroll = (container: HTMLDivElement) => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth > container.clientWidth + container.scrollLeft
      );
    };

    if (showcaseContainerRef.current) {
      const container = showcaseContainerRef.current;
      handleScroll(container);
      const onScroll = () => handleScroll(container);
      container.addEventListener('scroll', onScroll);

      return () => {
        container.removeEventListener('scroll', onScroll);
      };
    }
  }, [items, baseType, selectedCategory]);

  const handleCardClick = (baseType: UNPBaseType, id: string, item: any) => {
    navigate(
      `${customNavigationPrefix ? `/${customNavigationPrefix}` : ''}/${baseType}/${id}`
    );
  };

  const scrollLeft = () => {
    if (showcaseContainerRef.current) {
      showcaseContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (showcaseContainerRef.current) {
      showcaseContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div
      className="showcase-grid-container"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="showcase-title mb-3">{title}</h3>
      <div className="position-relative">
        {!isMobile && isHovered && (
          <>
            {canScrollLeft && (
              <button className="scroll-button left" style={{fontSize: 40}} onClick={scrollLeft}>
                ←
              </button>
            )}
            {canScrollRight && (
              <button className="scroll-button right" style={{fontSize: 40}} onClick={scrollRight}>
                →
              </button>
            )}
          </>
        )}
        <div
          className="d-flex overflow-hidden showcase-cards-container"
          ref={showcaseContainerRef}
        >
          {typeItems.map((item: any) => (
            <div key={item.id} className="showcase-card-wrapper">
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
                onClick={() => handleCardClick(item.baseType, item.id, item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UNPShowcaseGrid;