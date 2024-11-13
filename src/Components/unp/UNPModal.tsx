// src/components/unp/UNPModal.tsx

import React from 'react';
import { Modal, ModalProps, Button } from 'react-bootstrap';
import UNPButton from './UNPButton';

interface UNPModalProps extends ModalProps {
  // Optional additional props can go here, such as a confirm button handler
  onConfirm?: () => void;
}

const UNPModal: React.FC<UNPModalProps> = ({ children, onConfirm, ...props }) => {
  return (
    <Modal {...props} className={`unp-modal ${props.className || ''}`}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <UNPButton variant="secondary" onClick={props.onHide}>
          Close
        </UNPButton>
        {onConfirm && (
          <UNPButton variant="primary" onClick={onConfirm}>
            Confirm
          </UNPButton>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UNPModal;
