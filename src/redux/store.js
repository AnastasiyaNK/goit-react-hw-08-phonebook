import { configureStore } from '@reduxjs/toolkit';
import { phoneBookReducer } from './phoneBookSlice';
import { authReducer } from './authSlice';

export const store = configureStore({
  reducer: {
    phoneBook: phoneBookReducer,
    auth: authReducer,
  },
});
