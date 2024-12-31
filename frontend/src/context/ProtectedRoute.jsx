import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('token'); // Check token for authentication
  const userRole = localStorage.getItem('role'); // Get user role

  // If no token or role, redirect to the login page
  if (!token || !userRole) {
    return <Navigate to="/" replace={true} />;
  }

  // If the user's role is not in the allowedRoles, redirect to unauthorized page
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace={true} />;
  }

  // If the user is authenticated and role is allowed, render the children
  return children;
};

export default ProtectedRoute;
