import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import React from 'react';
import css from '../components/App.module.css';

const ContactsPage = () => {
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

export default ContactsPage;
