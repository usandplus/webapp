import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
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
import { useAuthContext } from './firebase/auth/AuthProvider'
import SuggestionsTable from './Views/Private/Suggestions'
import JoinUs from './Views/Public/JoinUs'
import Login from './Views/Public/Login'

export default function App() {
  const { user, loading } = useAuthContext();  // Get user and loading state from AuthProvider
  const navigate = useNavigate()
  const location = useLocation()
  console.log('authContext', {user, loading})
  return (
      <div className="">
      <UNPNavbar />
        {/* <NavbarComponent /> */}
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unete" element={<JoinUs />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/dashboard" element={<MyFoundations />} />
            <Route path="/admin/organizacion/:id" element={<OrganizationAdmin />} />
            <Route path="/admin/campana/:id" element={<CampaignAdmin />} />
            <Route path="/admin/empresa/:id" element={<BusinessAdmin />} />
            <Route path="/admin/convocatoria/:id" element={<FundraiserAdmin />} />
            <Route path="/organizacion/:id" element={<OrganizationView />} />
            <Route path="/campana/:id" element={<CampaignView />} />
            <Route path="/sugerencias" element={<SuggestionsTable />} />
            {/* Catch-all for 404 Not Found */}
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Container>
      </div>
  )
}

