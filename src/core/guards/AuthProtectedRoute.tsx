import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks';

interface AuthProtectedRouteProps {
  children: ReactNode;
}

export const AuthProtectedRoute = ({ children }: AuthProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  
  // Show loading while we check the token on app load...
  if (isLoading) {
    return <div>Loading session...</div>; 
  }

  // Redirect to login if there is no user in context
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // If user exists, render the child routes
  return <>{children}</>;
};

