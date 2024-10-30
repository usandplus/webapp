// src/components/unp/UNPAlert.tsx

import React from 'react';
import { Alert, AlertProps } from 'react-bootstrap';

interface UNPAlertProps extends AlertProps {
  message: string;// You can add additional props here
}

const UNPAlert: React.FC<UNPAlertProps> = ({ message, children, ...props }) => {
  return (
    <Alert {...props} className={`unp-alert ${props.className || ''}`}>
      {/* {children} */}
      <p>{message}</p>
    </Alert>
  );
};

export default UNPAlert;
