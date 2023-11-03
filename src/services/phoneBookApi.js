import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

export const setToken = token => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestRegister = async formData => {
  const { data } = await authInstance.post('users/signup', formData);
  setToken(data.token);
  return data;
};

export const requestLogin = async formData => {
  const { data } = await authInstance.post('users/login', formData);
  setToken(data.token);
  return data;
};

export const requestLogout = async () => {
  const { data } = await authInstance.post('users/logout');
  return data;
};
export const requestUsersCurrent = async () => {
  const { data } = await authInstance.get('users/current');
  return data;
};
