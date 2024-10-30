// src/Views/Public/Showroom.tsx

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import UNPAlert from '../../Components/unp/UNPAlert';
import UNPButton from '../../Components/unp/UNPButton';
import UNPCard from '../../Components/unp/UNPCard';
import UNPDropdown from '../../Components/unp/UNPDropdown';
import UNPFooter from '../../Components/unp/UNPFooter';
import UNPInput from '../../Components/unp/UNPInput';
import UNPNavbar from '../../Components/unp/UNPNavbar';
import UNPPagination from '../../Components/unp/UNPPagination';
import UNPSidebar from '../../Components/unp/UNPSidebar';
import UNPShowcaseGrid from '../../Components/unp/UNPShowcaseGrid';
import { UNPBaseCategory } from '../../types/models/common';
import UNPDocumentManager from '../../Components/unp/UNPDocumentManager';
import UNPCollaboratorManager from '../../Components/unp/UNPCollaboratorManager';
import UNPAnalytics from '../../Components/unp/UNPAnalytics';
import UNPReviews from '../../Components/unp/UNPReviews';
import UNPProfileBanner from '../../Components/unp/UNPProfileBanner';

const reviews = [
  {
    avatar: '/full_logo.png',
    name: 'John Doe',
    description: 'Verified Buyer',
    reviewText: 'This is the best product I have ever used!',
  },
  {
    avatar: '/full_logo.png',
    name: 'Jane Smith',
    description: 'Top Reviewer',
    reviewText: 'Absolutely fantastic! Highly recommend to everyone.',
  },
  {
    avatar: '/full_logo.png',
    name: 'Jane Smith',
    description: 'Top Reviewer',
    reviewText: 'Absolutely fantastic! Highly recommend to everyone.',
  },
  {
    avatar: '/full_logo.png',
    name: 'Jane Smith',
    description: 'Top Reviewer',
    reviewText: 'Absolutely fantastic! Highly recommend to everyone.',
  },
  {
    avatar: '/full_logo.png',
    name: 'Jane Smith',
    description: 'Top Reviewer',
    reviewText: 'Absolutely fantastic! Highly recommend to everyone.',
  },
];

const showcaseGridItems = [
    {
        "id": "6",
        "title": "Sample Title",
        "description": "This is a sample description.",
        "imgURL": "/full_logo.png",
        "rating": 4.5,
        "category": "educacion",
        "clientId": "6",
        "number": 107,
        "numberTitle": "Volunteers",
        "profileImgURL": "/full_logo.png",
        "baseType": "organizacion"
    },
    {
        "id": "10",
        "title": "Sample Title",
        "description": "This is a sample description.",
        "imgURL": "/full_logo.png",
        "rating": 4.5,
        "category": "educacion",
        "clientId": "10",
        "number": 293,
        "numberTitle": "Volunteers",
        "profileImgURL": "/full_logo.png",
        "baseType": "organizacion"
    },
    {
        "id": "13",
        "title": "Sample Title",
        "description": "This is a sample description.",
        "imgURL": "/full_logo.png",
        "rating": 4.5,
        "category": "educacion",
        "clientId": "13",
        "number": 256,
        "numberTitle": "Volunteers",
        "profileImgURL": "/full_logo.png",
        "baseType": "organizacion"
    },
    {
        "id": "14",
        "title": "Sample Title",
        "description": "This is a sample description.",
        "imgURL": "/full_logo.png",
        "rating": 4.5,
        "category": "educacion",
        "clientId": "14",
        "number": 213,
        "numberTitle": "Volunteers",
        "profileImgURL": "/full_logo.png",
        "baseType": "organizacion"
    },
    {
        "id": "19",
        "title": "Sample Title",
        "description": "This is a sample description.",
        "imgURL": "/full_logo.png",
        "rating": 4.5,
        "category": "educacion",
        "clientId": "19",
        "number": 297,
        "numberTitle": "Volunteers",
        "profileImgURL": "/full_logo.png",
        "baseType": "organizacion"
    }
]

const componentsList = [
  { name: 'UNPButton', component: <UNPButton label="Boton" onClick={()=>alert('Hola!')}/> },
  { name: 'UNPCard', 
    component: <UNPCard 
                    baseType='convocatoria' 
                    title='Convocatoria XYZ'
                    description="Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum"
                    imgURL='./full_logo.png'
                    profileImgURL='./full_logo.png'
                    rating={4.3}
                    category ='ciencia'
                    onClick={() => alert('hola!')}
                    clientId='101010'
                    number={512}
                    numberTitle="Voluntarios"
                     /> },
  { name: 'UNPDropdown', 
    component: <UNPDropdown 
                    title="Dropdown"
                    options={[{label: 'Option 1', value: '1'},{label: 'Option 2', value: '2'}]} 
                    onSelect={(e)=>alert(e)}
                    /> },
  { name: 'UNPFooter', component: <UNPFooter /> },
  { name: 'UNPInput', 
    component: <UNPInput 
                    type='email'
                    value='admin@usandplus.io'
                    label='Correo Electronico'
                    onChange={()=>alert('que haces chico!?')}
                    /> },
  { name: 'UNPNavbar', component: <UNPNavbar links={[{name: 'Home', path:'/showroom'}]}/> },
//   { name: 'UNPPagination', component: <UNPPagination /> },
//   { name: 'UNPSidebar', component: <UNPSidebar /> },
  { name: 'UNPShowcaseGrid', 
    component: <UNPShowcaseGrid selectedCategory={'educacion'} title="Fundaciones" items={showcaseGridItems} baseType={'organizacion'} />
},
  { name: 'Simple UNPShowcaseGrid', 
    component: <UNPShowcaseGrid simple selectedCategory={'educacion'} title="Fundaciones" items={showcaseGridItems} baseType={'organizacion'} />
},
  { name: 'UNPDocumentManager', 
    component: <UNPDocumentManager />
},
  { name: 'UNPCollaboratorManager', 
    component: <UNPCollaboratorManager />
},
  { name: 'UNPAnalytics', 
    component: <UNPAnalytics />
},
  { name: 'UNPReviews', 
    component: <UNPReviews reviews={reviews} averageRating={4.3} aiReview='Aqui va un review por inteligencia artificial'/>
},
  { name: 'UNPProfileBanner', 
    component: 
    <UNPProfileBanner
        avatarURL="/full_logo.png"
        categories="Photographer, Traveler"
        title="John Doe"
        achievements={['Top Contributor', 'Gold Member', '500K Followers']}
    />
},
];

const Showroom: React.FC = () => {
  return (
    <Container fluid className="p-4">
      <h1 className="mb-4 text-center">Showroom</h1>
      <Row>
        {componentsList.map(({ name, component }) => (
          <Col xs={12} key={name} className="mb-4">
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title className="text-center">{name}</Card.Title>
                {component}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Showroom;
