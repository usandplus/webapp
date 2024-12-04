import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UNPProfileBanner from './UNPProfileBanner';
import UNPButton from './UNPButton';
import UNPTextSection from './UNPTextSection';
import UNPRatingSummary from './UNPRatingSummary';

interface UNPStickyLayoutProps {
    entityInfo: Object;
    dataTitle: string;  // The title for the card
    dataContent: string;  // The content inside the card
    children: React.ReactNode;  // Children components to render in the left column
}

const UNPStickyLayout: React.FC<UNPStickyLayoutProps> = ({ dataTitle, dataContent, entityInfo, children }) => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const testData = {
        logo: "/full_logo.png",
        categories: "Photographer, Traveler",
        location: "San Pedro Garza Garcia",
        achievements: ['Top Contributor', 'Gold Member', '500K Followers'],
        name: 'Us & Plus',
        description: 'Una fundación es una organización privada sin fines de lucro que se caracteriza por perseguir objetivos de interés general para un grupo de beneficiarios. Se crea por la voluntad de una o varias personas, que destinan un patrimonio para la realización de sus fines. ',
        history: 'A detailed history of the entity.',
        ratingSummary: [
            { name: 'Estadistica Uno', rating: 3.5 },
            { name: 'Estadistica Dos', rating: 3.5 },
            { name: 'Estadistica Tres', rating: 3.5 },
            { name: 'Estadistica Cuatro', rating: 3.5 }
        ],
    activeCampaigns: [
        { url: '/campana/1', name: 'Campaña Uno', avatarURL: '/full_logo.png' },
        { url: '/campana/2', name: 'Campaña Dos', avatarURL: '/full_logo.png' },
        { url: '/campana/3', name: 'Campaña Tres', avatarURL: '/full_logo.png' },
        { url: '/campana/4', name: 'Campaña Cuatro', avatarURL: '/full_logo.png' }
    ],
        founders: [
            { id: 'founder1', name: 'Founder Uno', avatarURL: '/full_logo.png' },
            { id: 'founder2', name: 'Founder Dos', avatarURL: '/full_logo.png' },
            { id: 'founder3', name: 'Founder Tres', avatarURL: '/full_logo.png' },
            { id: 'founder4', name: 'Founder Cuatro', avatarURL: '/full_logo.png' }
        ],
        aboutUs: 'EmpowerChange Foundation is a nonprofit organization dedicated to creating opportunities for underserved communities worldwide. Through education, healthcare initiatives, and sustainable development programs, we aim to break cycles of poverty and empower individuals to thrive. Our team collaborates with local leaders and volunteers to deliver impactful solutions tailored to specific needs. By fostering resilience, equity, and innovation, EmpowerChange is building a brighter future for everyone. Join us in making a lasting difference, one community at a time. Together, we transform lives!',
        services: ['Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños',]
    }
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
                            avatarURL={testData.logo}
                            categories={testData.categories}
                            name={testData.name}
                            location={testData.location}
                            achievements={testData.achievements}
                        />
                        <div className="scrollable-content pt-3">
                            {children}
                        </div>
                    </Col>

                    {/* Right Column: Sticky Card */}
                    <Col md={5} className="d-none d-md-block">
                        <div className="sticky-card shadow-lg " style={{ position: 'sticky', top: '10px' }}>
                            <Card>
                                <Card.Header className='bg-white'>
                                    <Row><h3 className='main-text fw-bolder mt-1'>Dona Ahora</h3></Row>
                                    <Row><p>Us&Plus no recibe dinero de tus donaciones</p></Row>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        <UNPProfileBanner
                                            avatarURL={testData.logo}
                                            name={testData.name}
                                        /></Card.Title>
                                    <Card.Text>{testData.description}</Card.Text>
                                    <Card.Text>
                                        <UNPRatingSummary ratings={testData.ratingSummary} />
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="d-grid gap-2">
                                        <UNPButton size='lg' className='fw-bolder'>Dona Ahora</UNPButton>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Mobile Layout: Bottom Sticky Bar */}
            <div className="d-md-none">
                <UNPButton
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
                </UNPButton>

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
