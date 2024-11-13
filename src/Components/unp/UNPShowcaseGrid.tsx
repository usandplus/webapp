import { useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import UNPCard from './UNPCard';
import { UNPBaseCategory, UNPBaseType } from '../../types/models/common';
import UNPButton from './UNPButton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  const TOLERANCE = 5
  const handleScroll = () => {
    if (showcaseContainerRef.current) {
      const container = showcaseContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth > container.clientWidth + container.scrollLeft + TOLERANCE
      );
    }
  };

  useEffect(() => {
    if (showcaseContainerRef.current) {
      const container = showcaseContainerRef.current;
      handleScroll();
      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [items, baseType, selectedCategory]);

  const handleCardClick = (baseType: UNPBaseType, id: string, item: any) => {
    navigate(
      `${customNavigationPrefix ? `/${customNavigationPrefix}` : ''}/${baseType}/${id}`
    );
  };

  const smoothScroll = (distance: number, duration: number) => {
    const start = showcaseContainerRef.current?.scrollLeft || 0;
    const startTime = performance.now();
  
    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
  
      if (showcaseContainerRef.current) {
        showcaseContainerRef.current.scrollLeft = start + distance * progress;
      }
  
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        handleScroll(); // Update scroll state after scrolling completes
      }
    };
  
    requestAnimationFrame(animateScroll);
  };

  const scrollLeft = () => {
    smoothScroll(-600, 500); // 600px to the left over 500 milliseconds
  };

  const scrollRight = () => {
    smoothScroll(600, 500); // 600px to the right over 500 milliseconds
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
              <UNPButton className="scroll-button left" onClick={scrollLeft}>
                <FaChevronLeft />
              </UNPButton>
            )}
            {canScrollRight && (
              <UNPButton className="scroll-button right" onClick={scrollRight}>
                <FaChevronRight />
              </UNPButton>
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
