import { authInstance } from './phoneBookApi';

export const requestContacts = async () => {
  const { data } = await authInstance.get(`/contacts`);
  return data;
};

export const requestAddContact = async contact => {
  const { data } = await authInstance.post(`/contacts`, contact);
  return data;
};

export const requestDeleteContact = async contactId => {
  const { data } = await authInstance.delete(`/contacts/${contactId}`);
  return data;
};
