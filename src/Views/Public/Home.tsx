import React, { useEffect, useState } from 'react'
import styles from '../../Utils/styles.json'
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Button, Row, Col, Modal, Container, Image } from 'react-bootstrap'
import FilterCarousel from './../../Components/FilterCarousel'
// import Dashboard from './Views/Private/Dashboard'
import { useFirebase } from './../../Utils/Firebase'
// import Profile from './Views/Private/Profile'
import Card from './../../Components/Card';
import DisabledCard from './../../Components/DisabledCard';
import UNPFilterBar from '../../Components/unp/UNPFilterBar'
import UNPCard from '../../Components/unp/UNPCard'
import UNPShowcaseGrid, { UNPShowcaseGridProps } from '../../Components/unp/UNPShowcaseGrid'
import { UNPBaseCategory, UNPBaseType } from '../../types/models/common';

export default function App() {
  const currentUser = useFirebase()?.currentUser
  const signOut = useFirebase()?.signOutFromGoogle
  const navigate = useNavigate()
  const location = useLocation()
  const fundaciones = [{}, {}, {}, {}, {}, {}, {}, {},]
  const { category, clientId } = useParams()

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [selectedCategory, setSelectedCategory] = useState<UNPBaseCategory | null>(null);

  const handleFilterChange = (category: UNPBaseCategory | null) => {
    setSelectedCategory(category); // Allow null category
  };
  const [items, setItems] = useState<UNPShowcaseGridProps['items']>([]);

  useEffect(() => {
    const baseTypes: UNPBaseType[] = ['organizacion', 'convocatoria', 'campana', 'empresa'];
    const categoryTypes: UNPBaseCategory[] = [
      'educacion',
      'ciencia',
      'deporte',
      'salud',
      'medio ambiente',
      'arte',
      'tecnologia',
      'negocio',]

    const generateDummyData = () => {
      const dummyData = Array.from({ length: 20 }, (_, index) => ({
        id: `${index + 1}`,
        title: `Sample Title`,
        description: 'This is a sample description.',
        imgURL: '/full_logo.png', // Placeholder image
        rating: 4.5, // Fixed rating
        category: categoryTypes[Math.floor(Math.random() * categoryTypes.length)] as UNPBaseCategory, // Fixed category
        clientId: `${index + 1}`,
        number: Math.ceil(Math.random() * 500), // Fixed number of volunteers
        numberTitle: 'Volunteers',
        profileImgURL: '/full_logo.png', // Placeholder avatar
        // baseType: 'organizacion' as UNPBaseType, // Fixed baseType
        baseType: baseTypes[Math.floor(Math.random() * baseTypes.length)] as UNPBaseType, // Fixed baseType
      }));
      return dummyData;
    };

    // Set the items to the generated dummy data
    setItems(generateDummyData());
  }, []);


  return (
    <div className="p-0 p-md-3" style={{ backgroundColor: 'offwhite' }}>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Encuentra tu fundación favorita</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="rangeInput">Distancia</label>
                <input type="range" className="form-control" id="rangeInput" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="checkInput">Donataria Autorizada</label>
                <input type="checkbox" className="form-check-input" id="checkInput" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="selectInput">Estado</label>
                <select className="form-control" id="selectInput">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Row className="mb-3 mt-xs-3 mt-md-0">
        <Col md={10} xs={9}>
          <UNPFilterBar onFilterChange={handleFilterChange} selectedCategory={selectedCategory} />
        </Col>
        <Col className="d-flex align-items-end pb-3" >
          <Row>
            <Col md={2}>
              <Button onClick={handleShow}>Filtros</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col />
        <Col xs={10}>
          <UNPShowcaseGrid selectedCategory={selectedCategory} title="Fundaciones" items={items} baseType={'organizacion'} />
        </Col>
        <Col />
      </Row>
      <UNPShowcaseGrid selectedCategory={selectedCategory} title="Campañas" items={items} baseType={'campana'} />
      <UNPShowcaseGrid selectedCategory={selectedCategory} title="Campañas" items={items} baseType={'convocatoria'} />
      <UNPShowcaseGrid selectedCategory={selectedCategory} title="Campañas" items={items} baseType={'empresa'} />
    </div>)
}