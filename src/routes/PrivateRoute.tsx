import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean; // Boolean to check if the user is logged in
  requiredRole?: string; // Role required to access the route
  userRole?: string | null; // User's current role
  redirectTo?: string; // Path to redirect if not authorized
  loading: boolean; // Whether authentication state is still loading
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  requiredRole,
  userRole,
  redirectTo = '/login',
  loading,
}) => {
  const location = useLocation();

  // Show spinner while authentication is loading
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={`${redirectTo}?redirect=${location.pathname}`} />;
  }

  // Redirect to "Unauthorized" page if user doesn't have required role
  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/unauthorized" />;
  }

  // Render the protected route's children
  return <Outlet />;
};

export default ProtectedRoute;
