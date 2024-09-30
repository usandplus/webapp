import React, { useEffect } from 'react'
import './App.css'
import styles from './Utils/styles.json'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Button, Row, Col, Container, Image } from 'react-bootstrap'
import { useFirebase } from './Utils/Firebase'
import NavbarComponent from './Utils/Navbar'
import FilterCarousel from './Components/FilterCarousel'
import ProtectedRoute from './Utils/ProtectedRoute'
import Login from './Views/Public/Login'
import Clients from './Views/Public/Clients'
import Help from './Views/Public/Help'
import Dashboard from './Views/Private/Dashboard'
import Profile from './Views/Private/Profile'
import NewClient from './Views/Private/NewClient'
import ClientProfile from './Views/Private/ClientProfile'

export default function App() {
  const currentUser = useFirebase()?.currentUser
  const signOut = useFirebase()?.signOutFromGoogle
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    // check if location is / then redirect to /fundaciones/perros
    if (window.location.pathname === '/') {
      navigate('/fundaciones/mascotas')
      return
    }
  }, [location])
  console.log(location, currentUser)
  return (
    <div className="">
      <NavbarComponent />
      <Container fluid className="p-0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/fundaciones/*" element={<Clients />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/nuevaFundacion" element={<NewClient />} />
          <Route path="/ayuda" element={<Help />} />
          <Route path="/perfil/fundacion" element={<ClientProfile />} />

        </Routes>
      </Container>
    </div>
  )
}