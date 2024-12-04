import React from 'react';
import { Container, Row, Col, Image, Badge, Stack } from 'react-bootstrap';
import styles from '../../Utils/styles.json'

interface UNPProfileBannerProps {
    avatarURL: string;  // URL for the avatar image
    categories?: string;  // Tiny text above the name (e.g., categories or labels)
    name: string;  // Main name, like the profile's name
    location?: string;  // location
    achievements?: string[];  // Array of achievements or ranks for badges
    mini?: boolean;
}

const UNPProfileBanner: React.FC<UNPProfileBannerProps> = ({ avatarURL, categories, name, location, achievements, mini }) => {
    return (
        <Container fluid className="profile-banner py-4">
            <Row className="align-items-center">
                {/* Left Column: Full-Height Avatar */}
                <Col xs={12} md={3} className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                    <Image
                        src={avatarURL}
                        roundedCircle
                        className="avatar-image border"
                        style={{
                            height: '100%',
                            width: '100%',
                            maxWidth: '200px',
                            objectFit: 'cover'
                        }}
                    />
                </Col>

                {mini ? <></> :
                    < Col xs={12} md={9} className="d-flex flex-column justify-content-center">
                        {/* Top Row: Categories or Tiny Text */}
                        <Row>
                            <Col>
                                <small className="fw-lighter">{categories}</small>
                            </Col>
                        </Row>
                        {/* Middle Row: Big name */}
                        <Row>
                            <Col>
                                <h1 className="main-text fw-bolder">{name}</h1>
                                <small className="fw-normal">{location}</small>
                            </Col>
                        </Row>

                        {/* Bottom Row: Achievements or Badges */}
                        {achievements && achievements?.length > 0
                            ?
                            <Row className="mt-3">
                                <Stack direction="horizontal" gap={2}>
                                    {achievements.map((achievement, index) => (
                                        <Badge key={index} pill bg="light" className="main-text">
                                            {achievement}
                                        </Badge>
                                    ))}
                                </Stack>
                            </Row>
                            : <></>
                        }
                    </Col>
                }
            </Row>
        </Container >
    );
};

export default UNPProfileBanner;
