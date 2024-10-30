// src/components/unp/UNPInput.tsx

import React from 'react';
import { Form } from 'react-bootstrap';

// Define a union type for valid input types
type InputType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date';

interface UNPInputProps {
  type: InputType; // Use the InputType union
  value: string;
  label: string; // Ensure label is part of the props
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UNPInput: React.FC<UNPInputProps> = ({ type, value, label, onChange }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label> {/* Add label rendering */}
      <Form.Control type={type} value={value} onChange={onChange} />
    </Form.Group>
  );
};

export default UNPInput;
