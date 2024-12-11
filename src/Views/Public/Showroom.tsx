import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { addDocument } from '../../firebase/firestore/firestoreService';
import UNPAlert from '../../Components/unp/UNPAlert';
import UNPButton from '../../Components/unp/UNPButton';
import UNPCard from '../../Components/unp/UNPCard';
import UNPDropdown from '../../Components/unp/UNPDropdown';
import UNPFooter from '../../Components/unp/UNPFooter';
import UNPInput from '../../Components/unp/UNPInput';
import UNPNavbar from '../../Components/unp/UNPNavbar';
import UNPShowcaseGrid from '../../Components/unp/UNPShowcaseGrid';
import UNPDocumentManager from '../../Components/unp/UNPDocumentManager';
import UNPCollaboratorManager from '../../Components/unp/UNPCollaboratorManager';
import UNPAnalytics from '../../Components/unp/UNPAnalytics';
import UNPReviews from '../../Components/unp/UNPReviews';
import UNPProfileBanner from '../../Components/unp/UNPProfileBanner';
import { useAuthContext } from '../../firebase/auth/AuthProvider';

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
    "id": "65",
    "title": "Sample Title",
    "description": "This is a sample description.",
    "imgURL": "/full_logo.png",
    "rating": 4.5,
    "category": "educacion",
    "clientId": "6",
    "number": 107,
    "numberTitle": "Volunteers",
    "profileImgURL": "/full_logo.png",
    "baseType": "fundacion"
  },
  {
    "id": "150",
    "title": "Sample Title",
    "description": "This is a sample description.",
    "imgURL": "/full_logo.png",
    "rating": 4.5,
    "category": "educacion",
    "clientId": "10",
    "number": 293,
    "numberTitle": "Volunteers",
    "profileImgURL": "/full_logo.png",
    "baseType": "fundacion"
  },
  {
    "id": "153",
    "title": "Sample Title",
    "description": "This is a sample description.",
    "imgURL": "/full_logo.png",
    "rating": 4.5,
    "category": "educacion",
    "clientId": "13",
    "number": 256,
    "numberTitle": "Volunteers",
    "profileImgURL": "/full_logo.png",
    "baseType": "fundacion"
  },
  {
    "id": "154",
    "title": "Sample Title",
    "description": "This is a sample description.",
    "imgURL": "/full_logo.png",
    "rating": 4.5,
    "category": "educacion",
    "clientId": "14",
    "number": 213,
    "numberTitle": "Volunteers",
    "profileImgURL": "/full_logo.png",
    "baseType": "fundacion"
  },
  {
    "id": "195",
    "title": "Sample Title",
    "description": "This is a sample description.",
    "imgURL": "/full_logo.png",
    "rating": 4.5,
    "category": "educacion",
    "clientId": "19",
    "number": 297,
    "numberTitle": "Volunteers",
    "profileImgURL": "/full_logo.png",
    "baseType": "fundacion"
  },
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
    "baseType": "fundacion"
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
    "baseType": "fundacion"
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
    "baseType": "fundacion"
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
    "baseType": "fundacion"
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
    "baseType": "fundacion"
  }
]

const componentsList = [
  { name: 'UNPAnalytics', version: '1.2', component: <UNPAnalytics /> },
  { name: 'UNPButton', version: '1.3', component: <UNPButton onClick={() => alert('Hola!')} >Hola!</UNPButton> },
  { name: 'UNPCard', version: '1.3', component: <UNPCard baseType='convocatoria' title='Convocatoria XYZ' description="Lorem ipsum" imgURL='./full_logo.png' profileImgURL='./full_logo.png' rating={4.3} category='ciencia' onClick={() => alert('hola!')} clientId='101010' number={512} numberTitle="Voluntarios" /> },
  { name: 'UNPCollaboratorManager', version: '1.1', component: <UNPCollaboratorManager /> },
  { name: 'UNPDocumentManager', version: '1.1', component: <UNPDocumentManager /> },
  { name: 'UNPDropdown', version: '1.2', component: <UNPDropdown title="Dropdown" options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]} onSelect={(e) => alert(e)} /> },
  { name: 'UNPFooter', version: '1.2', component: <UNPFooter /> },
  { name: 'UNPInput', version: '1.2', component: <UNPInput type='email' value='admin@usandplus.io' label='Correo Electronico' onChange={() => alert('que haces chico!?')} /> },
  { name: 'UNPNavbar', version: '1.2', component: <UNPNavbar links={[{ name: 'Home', path: '/showroom' }]} /> },
  { name: 'UNPProfileBanner', version: '1.2', component: <UNPProfileBanner location="San Pedro Garza Garcia" avatarURL="/full_logo.png" categories="Photographer, Traveler" name="John Doe" achievements={['Top Contributor', 'Gold Member', '500K Followers']} /> },
  { name: 'UNPReviews', version: '1.2', component: <UNPReviews reviews={reviews} averageRating={4.3} aiReview='Aqui va un review por inteligencia artificial' /> },
  { name: 'UNPShowcaseGrid', version: '1.5', component: <UNPShowcaseGrid selectedCategory={'educacion'} title="Fundaciones" items={showcaseGridItems} baseType={'fundacion'} /> },
];

const Showroom: React.FC = () => {
  const {user} = useAuthContext()
  const [cookies, setCookie] = useCookies<string>([]);
  const [suggestions, setSuggestions] = useState<{ [key: string]: string }>({});


  const handleSendSuggestion = async (componentName: string, version: string, sendToFirestore: boolean = true) => {
    // Create a cookie to mark the component as reviewed
    setCookie(`reviewed_${componentName}`, version.toString(), { path: '/' });

    if (!sendToFirestore) {
      alert('thanks, wont appear next time')
      return
    }
    
    // Send the suggestion to Firestore
    try {
      console.log('trying to add document');
      await addDocument('suggestions', {
        component: componentName,
        version: version,
        suggestion: suggestions[componentName],
        timestamp: new Date(),
        user: user?.displayName || null
      });
      
      alert('Suggestion sent successfully!');
      setSuggestions({ ...suggestions, [componentName]: '' });
    } catch (error) {
      console.error('Error sending suggestion: ', error);
      alert('Failed to send suggestion. Please try again later.');
    }
  };


  console.log(cookies)
  return (
    <Container fluid className="p-4">
      <h1 className="mb-4 text-center">Showroom</h1>
      <Row>
        {componentsList.map(({ name, version, component }) => {
          const cookieKey: string = `reviewed_${name}`;
          const isReviewed = cookies[cookieKey]?.toString() === version.toString();

          console.log('rendering component', name, isReviewed);
          if (isReviewed) {
            return null; // Don't show the component if it's already reviewed
          }

          return (
            <Col xs={12} key={name} className="mb-4">
              <Card className="shadow-lg">
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title className="text-center">{name} (v{version})</Card.Title>
                      {component}
                    </Col>
                    <Col xs={3}>
                      <Form>
                        <Form.Group controlId={`suggestion-${name}`}>
                          <Form.Label>Suggestions for {name}</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={suggestions[name] || ''}
                            onChange={(e) => setSuggestions({ ...suggestions, [name]: e.target.value })}
                          />
                        </Form.Group>
                        <UNPButton
                          variant="primary"
                          className="mt-2"
                          onClick={() => handleSendSuggestion(name, version)}
                        >
                          Send Suggestion
                        </UNPButton>
                        <UNPButton
                          variant="success"
                          className="mt-2"
                          onClick={() => handleSendSuggestion(name, version, false)}
                        >
                          OK
                        </UNPButton>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Showroom;
