// src/components/unp/UNPButton.tsx

import React from 'react';
import { Button } from 'react-bootstrap';

interface UNPButtonProps {
  label: string; // Ensure label is part of the props
  onClick: () => void;
}

const UNPButton: React.FC<UNPButtonProps> = ({ label, onClick }) => {
  return (
    <Button onClick={onClick} style={{ fontSize: '20px' }}>
      {label} {/* Render the label */}
    </Button>
  );
};

export default UNPButton;
