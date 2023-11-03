import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  requestAddContact,
  requestContacts,
  requestDeleteContact,
} from 'services/api';

const INITIAL_STATE = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const contactsData = await requestContacts();
      return contactsData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkApi) => {
    try {
      const newContact = await requestAddContact(contact);
      return newContact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const deletedContact = await requestDeleteContact(contactId);
      return deletedContact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState: INITIAL_STATE,
  reducers: {
    setfilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      // ------------ GET CONTACTS ----------------------
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      // ------------ ADD CONTACT ----------------------
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = [...state.contacts.items, action.payload];
      })
      // ------------ DELETE CONTACT ----------------------
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload.id
        );
      })

      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.error = action.payload;
        }
      ),
});

export const { setfilter, toggleFavoriteContact } = phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;
