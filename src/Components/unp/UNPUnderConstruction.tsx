// UnderConstruction.tsx
import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './styles/UNPUnderConstruction.scss'; // Import custom styles
import { BiBeenHere, BiHappy } from 'react-icons/bi';
import { FundacionProfile } from '../../Views/Fundacion/FundacionView';

interface UNPUnderConstructionProps {
    profile: FundacionProfile | null
}

const UNPUnderConstruction: React.FC<UNPUnderConstructionProps> = ({ profile }) => {
    console.log(profile)
    return (
        <Container fluid className="under-construction-container d-flex align-items-center justify-content-center">
            <Row className="text-center">
                <Col>
                    {/* Illustrative Image or Animation */}
                    <Image
                        src={profile?.profileInfo.logo || "/assets/under-construction.svg"} // Replace with your image path
                        alt="Under Construction"
                        fluid
                        rounded
                        className="mb-4 construction-image"
                    />

                    {/* Informative Message */}
                    <h1 className="display-4">{profile?.profileInfo.name || <BiHappy color='primary'/>}</h1>
                    <p className="lead">Estamos trabajando en nuestro perfil. Siguenos en nuestras redes!</p>

                    {/* CTAs */}
                    <div className="mt-4">
                        <Button variant="primary" className="mx-2">
                            Al Directorio
                        </Button>
                        <Button variant="outline-primary" className="mx-2">
                            Nuestras Redes
                        </Button>
                    </div>

                    {/* Optional Social Media Links */}
                    <div className="mt-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UNPUnderConstruction;
