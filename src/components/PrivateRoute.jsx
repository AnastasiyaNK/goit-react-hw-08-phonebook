import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectisSignedIn } from 'redux/selectors';

const PrivateRoute = ({ children }) => {
  const isSignedIn = useSelector(selectisSignedIn);

  return isSignedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
