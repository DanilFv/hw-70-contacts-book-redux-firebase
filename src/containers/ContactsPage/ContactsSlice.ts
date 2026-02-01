import type {IContactForm, IContacts, IContactsAPI} from '../../types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';

interface ContactsSlice {
    contacts: IContacts[];
    oneContact: IContacts | null;
    isLoading: boolean;
    isAddLoading: boolean;
    isDeleteLoading: boolean;
}

export const initialState: ContactsSlice = {
    contacts: [],
    oneContact: null,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchAddContact.pending, (state) => {
            state.isAddLoading = true;
        });
         builder.addCase(fetchAddContact.fulfilled, (state) => {
            state.isAddLoading = false;
        });
         builder.addCase(fetchAddContact.rejected, (state) => {
            state.isAddLoading = false;
        });


         builder.addCase(fetchAllContacts.pending, (state) => {
            state.isAddLoading = true;
        });
          builder.addCase(fetchAllContacts.fulfilled, (state, action) => {
            state.isAddLoading = false;
            const payload = action.payload;

            if (!payload) {
                state.contacts = [];
                return
            }

            state.contacts = Object.keys(payload).map(contact => {
                return {
                    ...payload[contact],
                    id: contact
                }
            });
        });
           builder.addCase(fetchAllContacts.rejected, (state) => {
            state.isAddLoading = false;
        });
    }
});

export const fetchAllContacts = createAsyncThunk<IContactsAPI>('/contacts',
    async () => {
    const response = await axiosAPI.get<IContactsAPI>('contacts.json');
    return response.data;
});


export const fetchAddContact = createAsyncThunk<void, IContactForm>('/addContact', async (data) => {
    await axiosAPI.post<IContactForm>('contacts.json', data);
});


export const contactsReducer = contactsSlice.reducer;