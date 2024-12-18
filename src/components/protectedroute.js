import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from "./UserContext";

const ProtectedRoute = ({ element }) => {
  const { userData } = useContext(UserContext);

  if (!userData) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/" />;
  }

  // If user is authenticated, render the element
  return element;
};

export default ProtectedRoute;
