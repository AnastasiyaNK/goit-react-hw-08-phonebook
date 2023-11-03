import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/phoneBookSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleInputChange = event => {
    switch (event.target.name) {
      case 'name': {
        setName(event.target.value);
        break;
      }
      case 'phone': {
        setPhone(event.target.value);
        break;
      }
      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const isInContact = contacts.some(
      contact => contact.name.toLowerCase() === name
    );

    if (isInContact) {
      return alert(`${name} is already in contacts`);
    }
    const newContact = {
      name,
      phone,
    };
    dispatch(addContact(newContact));

    setName('');
    setPhone('');
  };

  return (
    <div className={css.containerForm}>
      <h1 className={css.titltForm}>Phonebook</h1>
      <form className={css.form} onSubmit={handleFormSubmit}>
        <label className={css.lebel}>
          Name
          <input
            onChange={handleInputChange}
            value={name}
            type="text"
            name="name"
            className={css.input}
            required
          />
        </label>
        <label className={css.lebel}>
          Number
          <input
            onChange={handleInputChange}
            value={phone}
            type="tel"
            name="phone"
            className={css.input}
            required
          />
        </label>
        <button className={css.addBtn}>Add contact</button>
      </form>
    </div>
  );
};
