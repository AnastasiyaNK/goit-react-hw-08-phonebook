import ContactsPage from 'pages/ContactsPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import RestrictedRoute from './RestrictedRoute';
import { useDispatch } from 'react-redux';
import { usersCurrentThunk } from 'redux/authSlice';
import PrivateRoute from './PrivateRoute';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersCurrentThunk());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <RegisterPage />
            </RestrictedRoute>
          }
        />
      </Routes>
    </div>
  );
};
