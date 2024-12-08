import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface UNPActiveCampaignsProps {
  campaigns?: {
    name: string;
    avatarURL: string;
    url: string;
  }[];
}

const UNPActiveCampaigns: React.FC<UNPActiveCampaignsProps> = ({ campaigns }) => {
  const title = 'Campañas Activas';
  const navigate = useNavigate(); // Initialize the React Router navigate function

  const handleImageClick = (url: string) => {
    navigate(url); // Use React Router's navigate function for navigation
  };

  console.log(campaigns)
  return (
    <Row className="border-top py-3">
      <h3 className="fw-bold text-primary pb-2">{title}</h3>
      {campaigns && campaigns.length > 0 ? (
        campaigns.map((campaign, i) => (
          <Col key={i} className="text-center mx-auto"
            xs='auto'
            onClick={() => handleImageClick(campaign.url)}
            style={{ cursor: 'pointer' }} // Adds a pointer cursor for better UX
          >
            <Image
              src={campaign.avatarURL}
              alt={campaign.name}
              style={{
                width:'100%',
                height:'auto',
                maxHeight: 250
              }}
              className="mb-2 rounded border"
            />
            <p className="text-primary fw-bold">{campaign.name}</p>
          </Col>
        ))
      ) : (
        <p>No hay campañas activas</p> // Fallback if no campaigns are provided
      )}
    </Row>
  );
};

export default UNPActiveCampaigns;
