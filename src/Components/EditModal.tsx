// src/components/EditModal.tsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
interface EditModalProps {
    show: boolean;
    handleClose: () => void;
    route: string;
    field: string;
    initialValue: string;
}

const EditModal: React.FC<EditModalProps> = ({ show, handleClose, route, field, initialValue }) => {
    const [value, setValue] = useState(initialValue);

    // Load initial data if needed
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleSave = async () => {
        try {
            const docRef = doc(firestore, route);
            await setDoc(docRef, { [field]: value }, { merge: true });
            handleClose(); // Close the modal after saving
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {field}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId={`formBasic${field}`}>
                    <Form.Label>{field}</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)} 
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
