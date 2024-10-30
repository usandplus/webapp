// src/components/unp/ProfileHeader.tsx

import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

interface ProfileHeaderProps {
  bannerImageURL: string;
  profileImageURL: string;
  title: string;
  subtitle?: string;
  rating?: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  bannerImageURL,
  profileImageURL,
  title,
  subtitle,
  rating
}) => {
  return (
    <div className="profile-header">
      <Image src={bannerImageURL} fluid className="profile-banner" style={{maxHeight: 500}} />
      <Row className="align-items-center mt-3">
        <Col xs={3}>
          <Image src={profileImageURL} roundedCircle fluid />
        </Col>
        <Col xs={9}>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
          {rating !== undefined && <p>Rating: {rating}/5</p>}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileHeader;
