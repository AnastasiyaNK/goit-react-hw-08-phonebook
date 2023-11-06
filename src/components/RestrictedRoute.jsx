import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectisSignedIn } from 'redux/selectors';

const RestrictedRoute = ({ children }) => {
  const isSignedIn = useSelector(selectisSignedIn);

  return isSignedIn ? <Navigate to="/contacts" /> : children;
};

export default RestrictedRoute;
