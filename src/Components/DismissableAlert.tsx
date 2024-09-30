import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface DismissableAlertProps {
  title: string;
  description: string;
  setShow: (show: boolean) => void;
  show: boolean;
}

function DismissableAlert({ title, description, setShow, show }: DismissableAlertProps) {
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        <p>{description}</p>
      </Alert>
    );
  }
  return <></>
}

export default DismissableAlert;