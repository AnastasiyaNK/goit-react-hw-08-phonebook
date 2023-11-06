import { toast } from 'react-toastify';
import {
  requestLogin,
  requestLogout,
  requestRegister,
  requestUsersCurrent,
  setToken,
} from 'services/phoneBookApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const respons = await requestRegister(formData);

      return respons;
    } catch (error) {
      if (error.response?.data.name === 'MongoError') {
        toast('Oops, user with this email already have an account!');
      }
      if (error.response?.data?.message) {
        toast(error.response?.data?.message);
      }

      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const respons = await requestLogin(formData);

      return respons;
    } catch (error) {
      toast(
        'Your credentials are wrong, please check your email or login one more time!'
      );
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const respons = await requestLogout();
      return respons;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const usersCurrentThunk = createAsyncThunk(
  'auth/usersCurrent',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    setToken(state.auth.token);
    try {
      const respons = await requestUsersCurrent();

      return respons;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (!token) return false;

      return true;
    },
  }
);

const INITIAL_STATE = {
  token: null,
  isLoading: false,
  error: null,
  user: {
    email: null,
    name: null,
  },
  isSignedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,

  extraReducers: builder =>
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        return INITIAL_STATE;
      })
      .addCase(usersCurrentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.user = action.payload;
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const authReducer = authSlice.reducer;
