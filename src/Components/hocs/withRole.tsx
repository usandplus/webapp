// src/utils/withRole.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../firebase/contexts/AuthContext';

interface WithRoleProps {
  requiredRole: string;
  children: React.ReactNode;
}

const withRole: React.FC<WithRoleProps> = ({ requiredRole, children }) => {
  const { user, role } = useAuth();

  const hasRequiredRole = user && role == requiredRole;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};

export default withRole;
