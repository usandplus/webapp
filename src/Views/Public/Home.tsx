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

  return (
    <div className="p-0 p-md-3">
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
          <FilterCarousel />
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
        <Col className="mx-auto" xs={11} md={5} lg={4} xl={3} >
          <Card
            disabled
            title=''
            description=''
            imgURL='/full_logo.png'
            rating={0}
            className="mb-5"
            category={'0'}
            clientId='0'
          />
        </Col>
        {fundaciones.map((fundacion, index) => {
          return <Col className="mx-auto" xs={11} md={5} lg={4} xl={3} key={index+1} >
            <Card
              title=''
              description=''
              imgURL='/full_logo.png'
              rating={0}
              className="mb-5"
              category={category}
              clientId={`${index+1}`}
            />
          </Col>
        })}
      </Row >
    </div>)
}