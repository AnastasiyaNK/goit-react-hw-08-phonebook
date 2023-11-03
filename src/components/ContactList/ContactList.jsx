import React, { useEffect } from 'react';
import css from './ContactList.module.css';
import { BsClipboard2Heart } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/phoneBookSlice';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
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
      {filteredContactsByName.map(contact => {
        return (
          <li className={css.contactItem} key={contact.id}>
            {contact.favourite && (
              <BsClipboard2Heart className={css.svgHeart} />
            )}
            {contact.name}: {contact.phone}
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
