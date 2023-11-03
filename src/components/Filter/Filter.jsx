import React from 'react';
import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { setfilter } from 'redux/phoneBookSlice';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleInputChange = event => {
    dispatch(setfilter(event.target.value));
  };

  return (
    <input
      className={css.inputContacts}
      type="text"
      value={filter}
      onChange={handleInputChange}
    />
  );
};
