import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { UserEntityMembership } from '../types/models/User';

interface ProtectedRouteProps {
  isAuthenticated: boolean; // Boolean to check if the user is logged in
  requiredEntityRole?: string; // Role required to access the route
  requiredRole?: string; // Role required to access the route
  userRole?: string | null; // User's current role
  redirectTo?: string; // Path to redirect if not authorized
  loading: boolean; // Whether authentication state is still loading
  userMemberships?: UserEntityMembership[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  requiredRole,
  requiredEntityRole,
  userRole,
  redirectTo = '/login',
  loading,
  userMemberships = [],
}) => {
  const location = useLocation();
  const { id: routeEntityId } = useParams<{ id: string }>(); // Extract 'id' from URL parameters

  const hasMatchingMembership = userMemberships.some(
    (membership) => membership.entityId === routeEntityId
  );
  console.log('hasMatchingMembership', hasMatchingMembership)
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

  // Check if the user has a membership matching the entityId in the URL
  if (routeEntityId) {
    if (!hasMatchingMembership) {
      return <Navigate to="/sinAcceso" />;
    }
  }

  // Redirect to "Unauthorized" page if user doesn't have the required role
  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/sinAcceso" />;
  }

  // Render the protected route's children
  return <Outlet />;
};

export default ProtectedRoute;
