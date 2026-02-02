import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
    selectContacts,
    selectIsDeleteLoading,
    selectIsLoading
} from './ContactsSelectors.ts';
import {useEffect, useState} from 'react';
import {fetchAllContacts, fetchDeleteContact} from './ContactsSlice.ts';
import ContactsCard from '../../components/ContactsCard/ContactsCard.tsx';
import type {IContacts} from '../../types';
import ModalWindow from '../../components/UI/Modal/ModalWindow.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import {Typography} from '@mui/material';


const ContactsPage = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedContact, setSelectedContact] = useState<IContacts | null>(null);
    const contacts = useAppSelector(selectContacts);
    const dispatch = useAppDispatch();
    const isDeleteLoading = useAppSelector(selectIsDeleteLoading);
    const isLoading = useAppSelector(selectIsLoading);

    const openModalFn = (id: string) => {
        const contact = contacts.find(item => item.id === id);
        if (contact) {
            setSelectedContact(contact);
            setModalOpen(true);
        }
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedContact(null);
    };

    const onDeleteContact = async (id: string) => {
        await dispatch(fetchDeleteContact(id));
        await dispatch(fetchAllContacts());
        setModalOpen(false);
    }

    useEffect(() => {
        dispatch(fetchAllContacts())
    }, [dispatch]);


    return (
        <>
            {!isLoading && contacts.length === 0 && <Typography component='p' variant='h6' sx={{ textAlign: 'center', fontWeight: 'bold' }}>No contacts found.</Typography>}
            {isLoading && <Spinner />}
            <ContactsCard contacts={contacts} onClick={openModalFn} />
            {selectedContact && <ModalWindow open={modalOpen} onClose={handleClose} contact={selectedContact} isLoading={isDeleteLoading} onDelete={onDeleteContact} />}
        </>
    );
};

export default ContactsPage;