import React, { useEffect } from 'react';
import css from './ContactList.module.css';
import { BsClipboard2Heart } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectContactsLoading,
  selectFilter,
} from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/phoneBookSlice';

import Loader from 'components/Home/Loader';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectContactsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContactsByName = getVisibleContacts();
  return (
    <ul>
      {isLoading && (
        <li className={css.contactItem}>
          <Loader />
        </li>
      )}
      {filteredContactsByName.map(contact => {
        return (
          <li className={css.contactItem} key={contact.id}>
            {contact.favourite && (
              <BsClipboard2Heart className={css.svgHeart} />
            )}
            {contact.name}: {contact.number}
            <button
              className={css.deleteBtn}
              onClick={() => handleDeleteContact(contact.id)}
            >
              &times;
            </button>
          </li>
        );
      })}
    </ul>
  );
};
