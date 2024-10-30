import React from 'react';
import { Card, CardProps, Row, Image, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { MainCardProps } from '../types/components';

const CustomCard: React.FC<MainCardProps> = ({ title, description, imgURL, rating, className, category, clientId, disabled }) => {
  const navigate = useNavigate()
  let _description = ``
  let _title = 'The Test Foundation'
  let _location = 'San Pedro Garza Garcia, NL'
  let _imgurl = '/full_logo.png'
  let _rating = 4.5
  let categories = ['Mascotas', 'Enfermedades', 'Ancianos', 'Educacion']
  return (
    <Card
      className={`${className}`}
      id="carouselCard"
      style={{
        backgroundColor: disabled ? '#EBEBE4' : '#FFF',
        cursor: disabled ? 'default' : 'pointer',
      }}
      onClick={() => disabled ? null : navigate(`/fundaciones/${category}/${clientId}`)}

    >
      <Row style={{ marginBottom: 12 }}>
        <Image
          src={_imgurl}
          style={{
            borderRadius: '10%',
            maxWidth: '100%'
          }}

        />
      </Row>
      <Row xs={8} className="fundacionTitleCardRow">
        <Col xs={3}>
          <Image src='/full_logo.png' height={50} rounded />
        </Col>
        <Col className="p-0">
          <p className="fs-5 mb-0" >{_title}</p>
          <Row>
            <p className="star">★{_rating}</p>
          </Row>
        </Col>
      </Row>
      <Row >
        <p className="fundacionCardRow">{_location}</p>
        <label className="fundacionCardRow">{categories[Math.floor(Math.random() * 4)]}</label>
      </Row>
      <Row>
        <p className="fundacionCardRowFooter fs-5">{Math.floor(Math.random() * 500)} <span style={{ fontWeight: 400 }}> voluntarios</span></p>
      </Row>
    </Card>
  );
}

export default CustomCard;