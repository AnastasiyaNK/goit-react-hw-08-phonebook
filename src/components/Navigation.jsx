import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutThunk } from 'redux/authSlice';
import { selectisSignedIn } from 'redux/selectors';

const Navigation = () => {
  const isSignedIn = useSelector(selectisSignedIn);
  const dispatch = useDispatch();

  return (
    <header>
      {isSignedIn ? (
        <>
          <NavLink to={'/contacts'}>
            <Button>Contacts</Button>
          </NavLink>
          <Button onClick={() => dispatch(logoutThunk())} variant="outlined">
            Log Out
          </Button>
        </>
      ) : (
        <>
          <NavLink to={'/'}>
            <Button>Home</Button>
          </NavLink>
          <NavLink to={'/register'}>
            <Button>Register</Button>
          </NavLink>
          <NavLink to={'/login'}>
            <Button>Login</Button>
          </NavLink>
        </>
      )}
    </header>
  );
};

export default Navigation;
