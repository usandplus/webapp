import React from 'react';
import { UNPBaseCategory } from '../../types/models/common';
import { Button, ButtonGroup } from 'react-bootstrap';
// import './UNPFilterBar.css'; // Custom CSS for better control

interface UNPFilterBarProps {
  onFilterChange: (category: UNPBaseCategory | null) => void;
  selectedCategory: UNPBaseCategory | null;
}

const UNPFilterBar: React.FC<UNPFilterBarProps> = ({ onFilterChange, selectedCategory }) => {
  const categories: { name: UNPBaseCategory; icon: string }[] = [
    { name: 'educacion', icon: 'book' },
    { name: 'ciencia', icon: 'microscope' },
    { name: 'deporte', icon: 'basketball' },
    { name: 'salud', icon: 'heart' },
    { name: 'medio ambiente', icon: 'leaf' },
    { name: 'arte', icon: 'palette' },
    { name: 'tecnologia', icon: 'laptop' },
    { name: 'negocio', icon: 'briefcase' },
  ];

  const handleCategorySelect = (category: UNPBaseCategory | null) => {
    onFilterChange(category);
  };

  return (
    <div className="filter-bar-wrapper">
      <ButtonGroup className="filter-bar" aria-label="Filter categories">
        <Button
          variant={selectedCategory === null ? 'primary' : 'light'}
          className={`filter-button ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => handleCategorySelect(null)}
        >
          <i className="bi bi-filter-circle" /> All
        </Button>
        {categories.map(({ name, icon }) => (
          <Button
            key={name}
            variant={selectedCategory === name ? 'primary' : 'light'}
            className={`filter-button ${selectedCategory === name ? 'active' : ''}`}
            onClick={() => handleCategorySelect(name)}
            style={{
              transition: 'background-color 0.3s ease',
            }}
          >
            <i className={`bi bi-${icon}`} /> {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default UNPFilterBar;
