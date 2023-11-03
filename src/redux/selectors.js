export const selectContacts = state => state.phoneBook.contacts.items;
export const selectFilter = state => state.phoneBook.filter;
export const selectContactsLoading = state =>
  state.phoneBook.contacts.isLoading;
