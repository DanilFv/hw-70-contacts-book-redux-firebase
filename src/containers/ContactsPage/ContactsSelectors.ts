import type {RootState} from '../../app/store.ts';

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectOneContact = (state: RootState) => state.contacts.oneContact;

export const selectIsAddLoading = (state: RootState) => state.contacts.isAddLoading;
export const selectIsLoading = (state: RootState) => state.contacts.isLoading;
export const selectIsDeleteLoading = (state: RootState) => state.contacts.isDeleteLoading;