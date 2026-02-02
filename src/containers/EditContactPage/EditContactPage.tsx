import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
    selectIsOneLoading,
    selectOneContact
} from '../ContactsPage/ContactsSelectors.ts';
import {fetchOneContact} from '../ContactsPage/ContactsSlice.ts';
import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const EditContactPage = () => {
    const {id} = useParams<{id: string}>();
    const contact = useAppSelector(selectOneContact);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsOneLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneContact(id));
        }
    },[id, dispatch]);

    let form = (
        <ContactForm isEdit={true} contactId={id} initialValues={contact ? contact : null} />
    );

    if (isLoading) {
        form = (<Spinner />)
    }
    
    return (
        form
    );
};

export default EditContactPage;