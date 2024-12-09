import React, { useRef, useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { UNPBaseCategory } from '../../types/models/common';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface UNPFilterBarProps {
  onFilterChange: (category: UNPBaseCategory | null) => void;
  selectedCategory: UNPBaseCategory | null;
}

const categories: { name: UNPBaseCategory; icon: string }[] = [
  { name: 'educacion', icon: 'book' },
  { name: 'ciencia', icon: 'calculator' },
  { name: 'deporte', icon: 'scooter' },
  { name: 'salud', icon: 'heart' },
  { name: 'medio ambiente', icon: 'tree' },
  { name: 'arte', icon: 'palette' },
  { name: 'tecnologia', icon: 'laptop' },
  { name: 'negocio', icon: 'briefcase' },
  { name: 'educacion', icon: 'book' },
  { name: 'ciencia', icon: 'calculator' },
  { name: 'deporte', icon: 'scooter' },
  { name: 'salud', icon: 'heart' },
  { name: 'medio ambiente', icon: 'tree' },
  { name: 'arte', icon: 'palette' },
  { name: 'tecnologia', icon: 'laptop' },
  { name: 'negocio', icon: 'briefcase' },
];

const UNPFilterBar: React.FC<UNPFilterBarProps> = ({ onFilterChange, selectedCategory }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect if viewport is desktop size
  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 992);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleCategorySelect = (category: UNPBaseCategory | null) => {
    onFilterChange(category);
  };

  const scrollByAmount = 200;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
    }
  };

  const checkArrows = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkArrows();
    el.addEventListener('scroll', checkArrows);
    return () => {
      el.removeEventListener('scroll', checkArrows);
    };
  }, []);

  return (
    <div className="position-relative d-flex align-items-center" style={{ height: '100px' }}>
      {/* Render arrows only on desktop and only if needed */}
      {isDesktop && canScrollLeft && (
        <button
          className="position-absolute start-0 top-50 translate-middle-y bg-white border rounded-circle shadow-sm"
          style={{ width: '32px', height: '32px', zIndex: 9999 }} // Added zIndex here
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <BiChevronLeft size={24} />
        </button>
      )}

      <Nav
        ref={scrollContainerRef}
        className="filter-bar-scroll-container d-flex flex-row align-items-center flex-nowrap w-100"
        style={{ overflowX: isDesktop ? 'hidden' : 'auto', overflowY: 'hidden', whiteSpace: 'nowrap' }}
        activeKey={selectedCategory || ''}
        variant="tabs"
      >
        <Nav.Item>
          <Nav.Link
            eventKey=""
            onClick={() => handleCategorySelect(null)}
            className="d-flex flex-column align-items-center text-muted px-3 py-2"
            style={selectedCategory === null ? { color: '#000', borderBottom: '2px solid #000' } : {}}
          >
            <i className="bi bi-emoji-sunglasses" style={{ fontSize: '1.5rem' }}></i>
            <span className="fw-semibold" style={{ fontSize: '1rem' }}>Todos</span>
          </Nav.Link>
        </Nav.Item>

        {categories.map(({ name, icon }) => {
          const isActive = selectedCategory === name;
          return (
            <Nav.Item key={name}>
              <Nav.Link
                eventKey={name}
                onClick={() => handleCategorySelect(name)}
                className="d-flex flex-column align-items-center text-muted px-3 pl-2"
                style={isActive ? { color: '#000', borderBottom: '2px solid #000' } : {}}
              >
                <i className={`bi bi-${icon}`} style={{ fontSize: '1.5rem' }}></i>
                <span className="fw-semibold" style={{ fontSize: '1rem' }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>

      {isDesktop && canScrollRight && (
        <button
          className="position-absolute end-0 top-50 translate-middle-y bg-white border rounded-circle shadow-sm"
          style={{ width: '32px', height: '32px', zIndex: 9999 }} // Added zIndex here as well
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <BiChevronRight size={24} />
        </button>
      )}

    </div>
  );
};

export default UNPFilterBar;
