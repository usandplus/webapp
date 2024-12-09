import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Offcanvas, Image } from 'react-bootstrap';
import UNPProfileBanner from './UNPProfileBanner';
import UNPButton from './UNPButton';
import UNPTextSection from './UNPTextSection';
import UNPRatingSummary from './UNPRatingSummary';

interface UNPStickyLayoutProps {
    entityInfo: Record<string, unknown>; // Consider a stricter type if structure is known
    dataTitle: string;
    dataContent: string;
    children: React.ReactNode;
}

// Example test data. In a real scenario, pass this through props or entityInfo.
const testData = {
    logo: "/stock/stock (4).jpg",
    categories: "Photographer, Traveler",
    location: "San Pedro Garza Garcia",
    achievements: ['Top Contributor', 'Gold Member', '500K Followers'],
    name: 'Us & Plus',
    description: 'Una fundación es una organización privada sin fines de lucro...',
    ratingSummary: [
        { name: 'Estadistica Uno', rating: 3.5 },
        { name: 'Estadistica Dos', rating: 3.5 },
        { name: 'Estadistica Tres', rating: 3.5 },
        { name: 'Estadistica Cuatro', rating: 3.5 }
    ],
};

const UNPStickyLayout: React.FC<UNPStickyLayoutProps> = ({ dataTitle, dataContent, entityInfo, children }) => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
            <Container fluid className="">
                <Row>
                    {/* Left Column */}
                    <Col xs='auto' lg={7} className="left-column">
                        <UNPProfileBanner
                            avatarURL={testData.logo}
                            categories={testData.categories}
                            name={testData.name}
                            location={testData.location}
                            achievements={testData.achievements}
                        />
                        <div className="pt-3">
                            {children}
                        </div>
                    </Col>

                    {/* Right Column: Sticky Card on Desktop */}
                    <Col lg={5} xxl={5} className="d-none d-lg-block ">
                        <div className="position-sticky" style={{ top: '70px' }}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-white">
                                    <h3 className="text-primary fw-bolder mt-1">Dona Ahora</h3>
                                    <p className="mb-0">Us & Plus no recibe dinero de tus donaciones</p>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        <Row className="g-0 align-items-center mx-auto">
                                            <Col xs={12} xl={5} className="me-auto">
                                                <h1 className="text-primary fw-bold">{testData.name}</h1>
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>{testData.description}</Card.Text>
                                    {testData.ratingSummary && (
                                        <Card.Text>
                                            <UNPRatingSummary ratings={testData.ratingSummary} />
                                        </Card.Text>
                                    )}
                                </Card.Body>
                                <Card.Footer className=''>
                                    <div className="d-grid gap-2">
                                        <UNPButton className="fw-bolder">
                                            Dona Ahora
                                        </UNPButton>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
    );
};

export default UNPStickyLayout;
