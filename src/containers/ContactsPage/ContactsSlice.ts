import type {
    IContactForm,
    IContacts,
    IContactsAPI,
    IUpdateContact
} from '../../types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';
import {toast} from 'react-toastify';

interface ContactsSlice {
    contacts: IContacts[];
    oneContact: IContacts | null;
    isLoading: boolean;
    isAddLoading: boolean;
    isDeleteLoading: boolean;
    isOneContactLoading: boolean;
}

export const initialState: ContactsSlice = {
    contacts: [],
    oneContact: null,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    isOneContactLoading: false
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
            state.isLoading = true;
        });
          builder.addCase(fetchAllContacts.fulfilled, (state, action) => {
            state.isLoading = false;
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
            state.isLoading = false;
        });

           builder.addCase(fetchDeleteContact.pending, (state) => {
               state.isDeleteLoading = true;
        });
           builder.addCase(fetchDeleteContact.fulfilled, (state) => {
               state.isDeleteLoading = false;
        });
           builder.addCase(fetchDeleteContact.rejected, (state) => {
               state.isDeleteLoading = false;
        });

           builder.addCase(fetchOneContact.pending, (state) => {
               state.isOneContactLoading = true;
        });
           builder.addCase(fetchOneContact.fulfilled, (state, action) => {
               state.isOneContactLoading = false;
               const payload = action.payload;
               if (payload) state.oneContact = payload;
        });
           builder.addCase(fetchOneContact.rejected, (state) => {
               state.isOneContactLoading = false;
        });

           builder.addCase(fetchEditContact.pending, (state) => {
               state.isOneContactLoading = true;
        });
             builder.addCase(fetchEditContact.fulfilled, (state) => {
               state.isOneContactLoading = false;
        });
               builder.addCase(fetchEditContact.rejected, (state) => {
               state.isOneContactLoading = false;
        });
    }
});

export const fetchAllContacts = createAsyncThunk<IContactsAPI, void>('/contacts',
    async () => {
    const response = await axiosAPI.get<IContactsAPI>('contacts.json');
    return response.data;
});


export const fetchAddContact = createAsyncThunk<void, IContactForm>('/addContact', async (data) => {
    await axiosAPI.post<IContactForm>('contacts.json', data);
    toast.success('Контакт успешно добавлен!');
});

export const fetchDeleteContact = createAsyncThunk<void, string>('/deleteContact', async (id) => {
    await axiosAPI.delete(`contacts/${id}.json`);
    toast.success('Контакт успешно удален!');
});

export const fetchOneContact= createAsyncThunk<IContacts, string>('/fetchOneContact', async (id) => {
    const response = await axiosAPI.get<IContactForm>(`contacts/${id}.json`);
    return {
        ...response.data,
        id
    };
});

export const fetchEditContact= createAsyncThunk<void, IUpdateContact>('/editContact',
    async ({id, contact}) => {
    await axiosAPI.put(`contacts/${id}.json`, contact);
    toast.success('Контакт успешно обновлен!');
});


export const contactsReducer = contactsSlice.reducer;