import { configureStore } from '@reduxjs/toolkit';
import { phoneBookReducer } from './phoneBookSlice';

export const store = configureStore({
  reducer: {
    phoneBook: phoneBookReducer,
  },
});
