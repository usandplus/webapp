import React, { useEffect } from 'react'
import { AuthProvider } from './firebase/contexts/AuthContext';
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
import Profile from './Views/Private/Profile'
import NewClient from './Views/Private/NewClient'
import ClientProfile from './Views/Private/ClientProfile'
import NotFound404 from './Views/Public/404'
import Home from './Views/Public/Home'
import OrganizationView from './Views/Organization/OrganizationView';
import Showroom from './Views/Public/Showroom';
import MyFoundations from './Views/Private/MyFoundations';
import UNPNavbar from './Components/unp/UNPNavbar';
import OrganizationAdmin from './Views/Organization/OrganizationAdmin';
import CampaignAdmin from './Views/Campaign/CampaignAdmin';
import BusinessAdmin from './Views/Business/BusinessAdmin';
import FundraiserAdmin from './Views/Fundraiser/FundraiserAdmin';
import CampaignView from './Views/Campaign/CampaignView';
export default function App() {
  const currentUser = useFirebase()?.currentUser
  const signOut = useFirebase()?.signOutFromGoogle
  const navigate = useNavigate()
  const location = useLocation()
  // useEffect(() => {
  //   // check if location is / then redirect to /fundaciones/perros
  //   if (window.location.pathname === '/') {
  //     navigate('/fundaciones/mascotas')
  //     return
  //   }
  // }, [location])
  console.log(location, currentUser)
  return (
    <AuthProvider>
      <div className="">
      <UNPNavbar />
        {/* <NavbarComponent /> */}
        <Container fluid className="p-0">
          <Routes>

            {/* <Route path="/fundaciones/*" element={<Clients />} /> */}
            {/* <Route path="/perfil" element={<Profile />} /> */}
            {/* <Route path="/nuevaFundacion" element={<NewClient />} /> */}
            {/* <Route path="/ayuda" element={<Help />} /> */}
            {/* <Route path="/perfil/fundacion" element={<ClientProfile />} /> */}

            <Route path="/" element={<Home />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/dashboard" element={<MyFoundations />} />
            <Route path="/admin/organizacion/:id" element={<OrganizationAdmin />} />
            <Route path="/admin/campana/:id" element={<CampaignAdmin />} />
            <Route path="/admin/empresa/:id" element={<BusinessAdmin />} />
            <Route path="/admin/convocatoria/:id" element={<FundraiserAdmin />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/signup" element={<SignUpView />} /> */}
            {/* <Route path="/subscriptions" element={<SubscriptionView />} /> */}

            {/* <Route path="/profile" element={<PrivateRoute component={ProfileView} />} /> */}


            <Route path="/organizacion/:id" element={<OrganizationView />} />
            <Route path="/campana/:id" element={<CampaignView />} />
            {/* <Route path="/empresa/:id" element={<PrivateRoute component={BusinessView} />} /> */}
            {/* <Route path="/convocatoria/:id" element={<PrivateRoute component={FundraiserView} />} /> */}


            {/* <Route path="/admin" element={<AdminRoute component={AdminView} />} /> */}

            {/* Catch-all for 404 Not Found */}
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Container>
      </div>
    </AuthProvider>
  )
}

