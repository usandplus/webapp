// src/components/unp/UNPDropdown.tsx

import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

interface UNPDropdownProps {
  title: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

const UNPDropdown: React.FC<UNPDropdownProps> = ({ title, options, onSelect }) => {
  return (
    <DropdownButton id="unp-dropdown" title={title}>
      {options.map((option) => (
        <Dropdown.Item key={option.value} onClick={() => onSelect(option.value)}>
          {option.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default UNPDropdown;
