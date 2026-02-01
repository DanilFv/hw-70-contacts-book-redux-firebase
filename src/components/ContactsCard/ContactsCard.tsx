import {Box} from '@mui/material';
import type {IContacts} from '../../types';
import ContactsCardItem from './ContactsCardItem/ContactsCardItem.tsx';
import * as React from 'react';

interface Props {
    contacts: IContacts[];
}

const ContactsCard: React.FC<Props> = ({contacts}) => {
    return (
        <Box>
            {contacts.map((contact) => (
                <ContactsCardItem contact={contact} />
            ))}
        </Box>
    );
};

export default ContactsCard;