import React from 'react';
import { Image, Row, Stack } from 'react-bootstrap';
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
      <h3 className="fw-bold main-text pb-2">{title}</h3>
      <Stack direction="horizontal" gap={5} className="flex-wrap">
        {campaigns && campaigns.length > 0 ? (
          campaigns.map((campaign, i) => (
            <div key={i} className="text-center"
              onClick={() => handleImageClick(campaign.url)}
              style={{ cursor: 'pointer' }} // Adds a pointer cursor for better UX
            >
              <Image
                src={campaign.avatarURL}
                alt={campaign.name}
                width={250}
                className="mb-2 rounded border"
              />
              <p className="main-text fw-bold">{campaign.name}</p>
            </div>
          ))
        ) : (
          <p>No hay campañas activas</p> // Fallback if no campaigns are provided
        )}
      </Stack>
    </Row>
  );
};

export default UNPActiveCampaigns;
