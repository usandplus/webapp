import React from 'react';
import { Col, Image, Row, Stack } from 'react-bootstrap';

interface UNPImportantPeopleProps {
  founders?: {
    name: string;
    avatarURL: string;
    description: string;
  }[];
}

const UNPImportantPeople: React.FC<UNPImportantPeopleProps> = ({ founders }) => {
  const title = 'Personas Clave';

  return (
    <Row className="border-top py-3">
      <h3 className="fw-bold main-text pb-2">{title}</h3>
      {founders && founders.length > 0 ? (
        <Stack direction='horizontal' gap={2}>
          {
            founders.map((founder, i) => {

              return i < 2 ? (
                <div key={i} className="text-center">
                  <Image
                    src={founder.avatarURL}
                    roundedCircle
                    alt={founder.name}
                    width={200}
                    className="mb-2"
                  />
                  <p className="main-text fw-bold">
                    {founder.name}
                  </p>
                  <p className="main-text">
                    {founder.description}
                  </p>
                </div>
              ) : <></>
            })
          }
        </Stack>
      ) : (
        <></>
      )}
    </Row>
  );
};

export default UNPImportantPeople;
