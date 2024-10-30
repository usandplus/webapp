import React from 'react';
import { Container, Row, Col, Image, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UNPProfileBannerProps {
    avatarURL: string;  // URL for the avatar image
    categories: string;  // Tiny text above the title (e.g., categories or labels)
    title: string;  // Main title, like the profile's name
    achievements: string[];  // Array of achievements or ranks for badges
}

const UNPProfileBanner: React.FC<UNPProfileBannerProps> = ({ avatarURL, categories, title, achievements }) => {
    return (
        <Container fluid className="profile-banner py-4">
            <Row className="align-items-center">
                {/* Left Column: Full-Height Avatar */}
                <Col xs={12} md={3} className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                    <Image
                        src={avatarURL}
                        roundedCircle
                        className="avatar-image"
                        style={{
                            height: '100%',
                            width: '100%',
                            maxWidth: '200px',
                            objectFit: 'cover'
                        }}
                    />
                </Col>

                {/* Right Column: Profile Info */}
                <Col xs={12} md={9} className="d-flex flex-column justify-content-center">
                    {/* Top Row: Categories or Tiny Text */}
                    <Row>
                        <Col>
                            <small className="text-muted">{categories}</small>
                        </Col>
                    </Row>

                    {/* Middle Row: Big Title */}
                    <Row>
                        <Col>
                            <h1>{title}</h1>
                        </Col>
                    </Row>

                    {/* Bottom Row: Achievements or Badges */}
                    <Row>
                        {achievements.map((achievement, index) => (
                            <Col >
                                <Badge key={index} pill bg="primary" >
                                    {achievement}
                                </Badge>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default UNPProfileBanner;
