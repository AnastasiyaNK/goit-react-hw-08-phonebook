// import ContactsPage from 'pages/ContactsPage';
// import HomePage from 'pages/HomePage';
// import LoginPage from 'pages/LoginPage';
// import NotFoundPage from 'pages/NotFoundPage';
// import RegisterPage from 'pages/RegisterPage';
import React, { Suspense, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import RestrictedRoute from './RestrictedRoute';
import { useDispatch } from 'react-redux';
import { usersCurrentThunk } from 'redux/authSlice';
import PrivateRoute from './PrivateRoute';
import Loader from './Home/Loader';
import { lazy } from 'react';

const ContactsPage = lazy(() => import('pages/ContactsPage'));
const HomePage = lazy(() => import('pages/HomePage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersCurrentThunk());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
