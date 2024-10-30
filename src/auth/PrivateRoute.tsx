// src/auth/PrivateRoute.tsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../firebase/auth/AuthProvider';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  // If user is not authenticated, redirect them to login and preserve the current location
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If user is authenticated, render the child component
  return children;
};

export default PrivateRoute;
