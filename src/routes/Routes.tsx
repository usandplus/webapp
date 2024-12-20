import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './PrivateRoute';
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
import JoinUs from '../Views/Public/JoinUs';
import Login from '../Views/Public/Login';
import UserAdmin from '../Views/User/UserAdmin';
import UserView from '../Views/User/UserView';
import LogoutView from '../Views/Public/Logout';
import NewFundacionView from '../Views/Fundacion/NewFundacionView';
import NewFundraiserView from '../Views/Fundraiser/NewFundraiserView';
import NewCampaignView from '../Views/Campaign/NewCampaignView';
import NewBusinessView from '../Views/Business/NewBusinessView';
import NewACView from '../Views/AC/NewACView';
import ProfileView from '../Views/Public/Profile';
import ACAdmin from '../Views/AC/ACAdmin';
import Unauthorized401 from '../Views/Public/401';

const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/unete', element: <JoinUs /> },
  { path: '/showroom', element: <Showroom /> },
  { path: '/fundacion/:entityId', element: <FundacionView testData={true} /> },
  { path: '/campana/:entityId', element: <CampaignView /> },
  { path: '/usuario/:entityId', element: <UserView /> },
  { path: '/logout', element: <LogoutView /> },
  { path: '/sinAcceso', element: <Unauthorized401 /> },
  { path: '*', element: <NotFound404 /> },
];

const protectedRoutes = [
  { path: '/perfil', element: <UserView />, requiredRole: 'user' },
  { path: '/nuevaConvocatoria', element: <NewFundraiserView />, requiredRole: 'user' },
  { path: '/nuevaFundacion', element: <NewFundacionView />, requiredRole: 'user' },
  { path: '/nuevaCampana', element: <NewCampaignView />, requiredRole: 'user' },
  { path: '/nuevaEmpresa', element: <NewBusinessView />, requiredRole: 'user' },
  { path: '/nuevaAC', element: <NewACView />, requiredRole: 'user' },
  { path: '/dashboard', element: <UserAdmin />, requiredRole: 'user' },
  { path: '/admin/fundacion/:id', element: <FundacionAdmin />, requiredEntityRole: 'admin' },
  { path: '/admin/ac/:id', element: <ACAdmin />, requiredEntityRole: 'admin' },
  { path: '/admin/empresa/:id', element: <BusinessAdmin />, requiredEntityRole: 'admin' },
  { path: '/admin/campana/:id', element: <CampaignAdmin />, requiredEntityRole: 'admin' },
  { path: '/admin/convocatoria/:id', element: <FundraiserAdmin />, requiredEntityRole: 'admin' },
];

const AppRoutes: React.FC = () => {
  const { user, loading, userMemberships } = useAuthContext();
  console.log(user)
  const renderProtectedRoute = (route: any) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <ProtectedRoute
          isAuthenticated={!!user}
          requiredRole={route.requiredRole}
          userRole={user?.role}
          redirectTo="/login"
          loading={loading}
          userMemberships={userMemberships}
        />
      }
    >
      <Route element={route.element} path={route.path} />
    </Route>
  );

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {protectedRoutes.map(renderProtectedRoute)}
    </Routes>
  );
};

export default AppRoutes;
