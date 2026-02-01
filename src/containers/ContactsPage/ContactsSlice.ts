import type {IContacts} from '../../types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface ContactsSlice {
    contacts: IContacts[];
    oneContact: IContacts | null;
    isLoading: boolean;
    isDeleteLoading: boolean;
}

export const initialState: ContactsSlice = {
    contacts: [],
    oneContact: null,
    isLoading: false,
    isDeleteLoading: false,
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {

    }
});


const fetchAddContact = createAsyncThunk('/addContact', async () => {
    await
})


export const contactsReducer = contactsSlice.reducer;