import {Box} from '@mui/material';
import type {IContacts} from '../../types';
import ContactsCardItem from './ContactsCardItem/ContactsCardItem.tsx';
import * as React from 'react';

interface Props {
    contacts: IContacts[];
    onClick: (id: string) => void;
}

const ContactsCard: React.FC<Props> = ({contacts, onClick}) => {
    return (
        <Box>
            {contacts.map((contact) => (
                <Box key={contact.id} onClick={() => onClick(contact.id)}>
                    <ContactsCardItem key={contact.id} contact={contact} />
                </Box>
            ))}
        </Box>
    );
};

export default ContactsCard;