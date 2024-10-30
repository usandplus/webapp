import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UNPProfileBanner from './UNPProfileBanner';

interface UNPStickyLayoutProps {
    dataTitle: string;  // The title for the card
    dataContent: string;  // The content inside the card
    children: React.ReactNode;  // Children components to render in the left column
}

const UNPStickyLayout: React.FC<UNPStickyLayoutProps> = ({ dataTitle, dataContent, children }) => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
        <>
            <Container fluid className="p-3">
                {/* Desktop/Large Screen Layout */}
                <Row>
                    {/* Left Column: Scrollable Content */}
                    <Col md={7} className="left-column">
                        <UNPProfileBanner
                            avatarURL="/full_logo.png"
                            categories="Photographer, Traveler"
                            title="John Doe"
                            achievements={['Top Contributor', 'Gold Member', '500K Followers']}
                        />
                        <div className="scrollable-content mt-5">
                            {children}
                        </div>
                    </Col>

                    {/* Right Column: Sticky Card */}
                    <Col md={5} className="d-none d-md-block">
                        <div className="sticky-card" style={{ position: 'sticky', top: '10px' }}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{dataTitle}</Card.Title>
                                    <Card.Text>{dataContent}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Mobile Layout: Bottom Sticky Bar */}
            <div className="d-md-none">
                <Button
                    variant="light"
                    className="sticky-bar"
                    style={{
                        borderRadius: 0,
                        position: 'fixed',
                        bottom: '0',
                        left: '0',  // Ensures it starts from the very left of the screen
                        right: '0', // Ensures it spans to the very right of the screen
                        zIndex: 1000,
                        backgroundColor: 'white',
                        borderTop: '1px solid black',
                        color: 'black',
                        width: '100vw',  // Full viewport width
                        padding: '10px 0',  // Adjust padding for a better look
                        textAlign: 'center'
                    }}
                    onClick={handleShow}
                >
                    {/* Top Arrow */}
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>▲</div>
                    {/* Text Under Arrow */}
                    <div>View Details</div>
                </Button>

                {/* Offcanvas for mobile view */}
                <Offcanvas show={showOffcanvas} onHide={handleClose} placement="bottom">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{dataTitle}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <p>{dataContent}</p>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
};

export default UNPStickyLayout;
