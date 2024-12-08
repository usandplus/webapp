import React from 'react';
import { Container, Row, Col, Image, Badge } from 'react-bootstrap';

interface UNPProfileBannerProps {
    avatarURL: string;
    categories?: string;
    name: string;
    location?: string;
    achievements?: string[];
    mini?: boolean;
}

const UNPProfileBanner: React.FC<UNPProfileBannerProps> = ({
    avatarURL,
    categories,
    name,
    location,
    achievements,
    mini,
}) => {
    return (
        <Container fluid className="profile-banner pb-4 pt-lg-3 pt-0">
            <Row className="align-items-center">
                {/* Details Column */}
                {!mini && (
                    <Col xs={7} sm={8} className="d-flex flex-column justify-content-center order-1 order-sm-2">
                        {categories && (
                            <div className="mb-1">
                                <small className="text-muted fw-light">{categories}</small>
                            </div>
                        )}

                        <div className="mb-1">
                            <h1 className="text-primary fw-bold mb-0">{name}</h1>
                            {location && <small className="text-secondary">{location}</small>}
                        </div>

                        {achievements && achievements.length > 0 && (
                            <div className="mt-3">
                                {achievements.map((achievement, index) => (
                                    <Badge
                                        key={index}
                                        pill
                                        bg="light"
                                        className="text-primary border border-primary me-2 mb-2"
                                    >
                                        {achievement}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </Col>
                )}

                {/* Avatar Column */}
                <Col xs={4} className={`d-flex justify-content-center order-2`}>
                    <Image
                        src={avatarURL}
                        alt={`${name}'s avatar`}
                        style={{ maxHeight: '8em', borderRadius: '50%' }}
                        className="avatar-image border"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default UNPProfileBanner;
