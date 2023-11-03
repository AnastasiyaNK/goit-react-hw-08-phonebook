import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6538c7dca543859d1bb1e824.mockapi.io',
});

export const requestContacts = async () => {
  const { data } = await instance.get(`/contacts`);
  return data;
};

export const requestAddContact = async contact => {
  const { data } = await instance.post(`/contacts`, contact);
  return data;
};

export const requestDeleteContact = async contactId => {
  const { data } = await instance.delete(`/contacts/${contactId}`);
  return data;
};
