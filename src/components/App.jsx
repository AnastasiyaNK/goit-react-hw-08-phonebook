import React from 'react';

import css from './App.module.css';
import { ContactList } from './ContactList/ContactList';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

export const App = () => {
  return (
    <div className={css.phoneBook}>
      <ContactForm />
      <h2 className={css.contactsTitle}>Contacts</h2>
      <p className={css.contactsText}>Find contacts by name</p>
      <Filter />
      <ContactList />
    </div>
  );
};
