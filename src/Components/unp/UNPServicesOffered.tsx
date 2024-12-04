import React from 'react';
import { Col, Image, Row, Stack } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

interface UNPServicesOfferedProps {
  services?: string[];
}

const UNPServicesOffered: React.FC<UNPServicesOfferedProps> = ({ services }) => {
  let title = 'Lo que ofrecemos';

  return (
    <Row className="border-top py-3">
      <h3 className="fw-bold main-text pb-2">{title}</h3>
      {services
        ? <Stack direction='vertical'>
          {
            Object.entries(services).map((item, i) => {
              console.log(item)
              return i < 5 ? <p className='main-text fw-bold'><FaStar /> {item[0]}: {item[1]}</p> : <></>
            })
          }
        </Stack>
        : <></>
      }
    </Row>
  );
};

export default UNPServicesOffered;
