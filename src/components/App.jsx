import { Button } from '@mui/material';
import ContactsPage from 'pages/ContactsPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import React from 'react';

import { NavLink, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <header>
        <NavLink to={'/contacts'}>
          <Button>Contacts</Button>
        </NavLink>
        <Button variant="outlined">Log Out</Button>
        <NavLink to={'/register'}>
          <Button>Register</Button>
        </NavLink>
        <NavLink to={'/login'}>
          <Button>Login</Button>
        </NavLink>
      </header>
      <Routes>
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};
