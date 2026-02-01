import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectContacts} from './ContactsSelectors.ts';
import {useEffect} from 'react';
import {fetchAllContacts} from './ContactsSlice.ts';
import ContactsCard from '../../components/ContactsCard/ContactsCard.tsx';


const ContactsPage = () => {
    const contactsSelector = useAppSelector(selectContacts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllContacts())
    }, [dispatch]);


    return (
        <>
           <ContactsCard contacts={contactsSelector} />
        </>
    );
};

export default ContactsPage;