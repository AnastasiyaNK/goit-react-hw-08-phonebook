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
      // { token: 'awdwda}, user: {name: "Oleg", email: "oleg@gmail.com"} }
      return respons;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const respons = await requestLogin(formData);
      // { token: 'awdwda}, user: {name: "Oleg", email: "oleg@gmail.com"} }
      return respons;
    } catch (error) {
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
      // { name: "Oleg", email: "oleg@gmail.com" }
      return respons;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
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
