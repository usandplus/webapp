import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // Import your reusable PrivateRoute component
import { useAuthContext } from '../firebase/auth/AuthProvider'; // Firebase Auth Context

import NotFound404 from '../Views/Public/404';
import Home from '../Views/Public/Home';
import FundacionView from '../Views/Fundacion/FundacionView';
import Showroom from '../Views/Public/Showroom';
import FundacionAdmin from '../Views/Fundacion/FundacionAdmin';
import CampaignAdmin from '../Views/Campaign/CampaignAdmin';
import BusinessAdmin from '../Views/Business/BusinessAdmin';
import FundraiserAdmin from '../Views/Fundraiser/FundraiserAdmin';
import CampaignView from '../Views/Campaign/CampaignView';
import JoinUs from '../Views/Public/JoinUs'
import Login from '../Views/Public/Login'
import UserAdmin from '../Views/User/UserAdmin'
import UserView from '../Views/User/UserView'
import LogoutView from '../Views/Public/Logout';
import ProtectedRoute from './PrivateRoute';
import NewFundacionView from '../Views/Fundacion/NewFundacionView';
import NewFundraiserView from '../Views/Fundraiser/NewFundraiserView';
import NewCampaignView from '../Views/Campaign/NewCampaignView';
import NewBusinessView from '../Views/Business/NewBusinessView';
import NewACView from '../Views/AC/NewACView';
import ProfileView from '../Views/Public/Profile';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuthContext();
  console.log('app', user)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unete" element={<JoinUs />} />
      <Route path="/showroom" element={<Showroom />} />
      <Route path="/fundacion/:id" element={<FundacionView />} />
      <Route path="/campana/:id" element={<CampaignView />} />
      <Route path="/usuario/:id" element={<UserView />} />

      {/* Public */}

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute
            isAuthenticated={user ? true : false}
            requiredRole="user"
            userRole={user?.role}
            redirectTo="/login"
            loading={loading}
          />
        }
      >
      <Route path="/perfil" element={<UserView />} />
      </Route>

      {/* New Entity Journeys */}

      <Route
        element={
          <ProtectedRoute
            isAuthenticated={user ? true : false}
            requiredRole="user"
            userRole={user?.role}
            redirectTo="/login"
            loading={loading}
          />
        }
      >
        <Route path="/nuevaConvocatoria" element={<NewFundraiserView />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            isAuthenticated={user ? true : false}
            requiredRole="user"
            userRole={user?.role}
            redirectTo="/login"
            loading={loading}
          />
        }
      >
        <Route path="/nuevaFundacion" element={<NewFundacionView />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            isAuthenticated={user ? true : false}
            requiredRole="user"
            userRole={user?.role}
            redirectTo="/login"
            loading={loading}
          />
        }
      >
        <Route path="/nuevaCampana" element={<NewCampaignView />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            isAuthenticated={user ? true : false}
            requiredRole="user"
            userRole={user?.role}
            redirectTo="/login"
            loading={loading}
          />
        }
      >
        <Route path="/nuevaEmpresa" element={<NewBusinessView />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            isAuthenticated={user ? true : false}
            requiredRole="user"
            userRole={user?.role}
            redirectTo="/login"
            loading={loading}
          />
        }
      >
        <Route path="/nuevaAC" element={<NewACView />} />
      </Route>


      <Route
        element={
          <ProtectedRoute
            isAuthenticated={user ? true : false}
            requiredRole="user"
            userRole={user?.role}
            redirectTo="/login"
            loading={loading}
          />
        }
      >
        <Route path="/dashboard" element={<UserAdmin />} />
      </Route>
      <Route path="/dashboard" element={<UserAdmin />} />
      <Route path="/admin/fundacion/:id" element={<FundacionAdmin />} />
      <Route path="/admin/campana/:id" element={<CampaignAdmin />} />
      <Route path="/admin/empresa/:id" element={<BusinessAdmin />} />
      <Route path="/admin/convocatoria/:id" element={<FundraiserAdmin />} />
      <Route path="/logout" element={<LogoutView />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default AppRoutes;
