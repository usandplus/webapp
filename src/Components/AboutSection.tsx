// src/components/unp/AboutSection.tsx

import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import withEditMode from './hocs/withEditMode';
import EditModal from './EditModal';

interface AboutSectionProps {
    id: string;
    title: string;
    description: string;
    additionalDetails?: { label: string; value: string }[]; // Optional extra info
}

// Now `editMode` is included in the props without needing Omit
const AboutSection: React.FC<AboutSectionProps & { editMode?: boolean }> = ({
    id,
    title,
    description,
    additionalDetails,
    editMode
}) => {
    const [showModal, setShowModal] = useState(false);
    console.log("AboutSection -- Start View")
    console.log(id,
      title,
      description,
      additionalDetails,
      editMode)
    console.log("AboutSection -- End View")
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <Card className="mb-4">
            <Card.Body>
                <h3>{title}

                {editMode && (
                  <i onClick={handleShowModal} style={{ cursor: 'pointer', color: 'blue', fontSize: 18 }} className="bi bi-pencil" />
                )}
                </h3>
                <p>{description}</p>
                {additionalDetails && (
                    <ul>
                        {additionalDetails.map((detail, index) => (
                            <li key={index}>
                                <strong>{detail.label}: </strong>
                                {detail.value}
                            </li>
                        ))}
                    </ul>
                )}
            </Card.Body>
            <EditModal
                show={showModal}
                handleClose={handleCloseModal}
                route={`publicData/profileData/${id}`}
                field="about"
                initialValue={description}
            />
        </Card>
    );
};

export default withEditMode(AboutSection);
