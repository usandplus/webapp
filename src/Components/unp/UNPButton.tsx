// src/components/unp/UNPButton.tsx

import React from 'react';
import { ButtonProps } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

interface UNPButtonProps extends ButtonProps {
  label?: string;
  children?: React.ReactNode; // Add children to the props
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void); // Accepts either a no-argument function or a MouseEvent function
}

const UNPButton: React.FC<UNPButtonProps> = ({ label, children, onClick, ...props }) => {
  return (
    <Button onClick={onClick} {...props} style={{ fontSize: '1.2rem' }}>
      {label}
      {children}
    </Button>
  );
};

export default UNPButton;
