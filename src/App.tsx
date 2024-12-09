import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, ScrollRestoration } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotFound404 from './Views/Public/404';
import Home from './Views/Public/Home';
import OrganizationView from './Views/Organization/OrganizationView';
import Showroom from './Views/Public/Showroom';
import MyFoundations from './Views/Private/MyFoundations';
import UNPNavbar from './Components/unp/UNPNavbar';
import OrganizationAdmin from './Views/Organization/OrganizationAdmin';
import CampaignAdmin from './Views/Campaign/CampaignAdmin';
import BusinessAdmin from './Views/Business/BusinessAdmin';
import FundraiserAdmin from './Views/Fundraiser/FundraiserAdmin';
import CampaignView from './Views/Campaign/CampaignView';
import { useAuthContext } from './firebase/auth/AuthProvider'
import SuggestionsTable from './Views/Private/Suggestions'
import JoinUs from './Views/Public/JoinUs'
import Login from './Views/Public/Login'
import UserAdmin from './Views/User/UserAdmin'
import UserView from './Views/User/UserView'

export default function App() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Optional: If your navbar or other elements change on scroll, you can track here.
  // If not needed, you can remove this state and logic.
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-root">
      {/* Pass isScrolled to Navbar if you want it to adjust styling on scroll */}
      <div className="d-none d-lg-block sticky-top">
        <UNPNavbar isScrolled={isScrolled} />
      </div>
      <div className="d-block d-lg-none">
        <UNPNavbar />
      </div>
      <Container fluid className="gx-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unete" element={<JoinUs />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/dashboard" element={<UserAdmin />} />
          <Route path="/admin/organizacion/:id" element={<OrganizationAdmin />} />
          <Route path="/admin/campana/:id" element={<CampaignAdmin />} />
          <Route path="/admin/empresa/:id" element={<BusinessAdmin />} />
          <Route path="/admin/convocatoria/:id" element={<FundraiserAdmin />} />
          <Route path="/organizacion/:id" element={<OrganizationView />} />
          <Route path="/campana/:id" element={<CampaignView />} />
          <Route path="/usuario/:id" element={<UserView />} />
          <Route path="/sugerencias" element={<SuggestionsTable />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Container>
    </div >
  );
}
