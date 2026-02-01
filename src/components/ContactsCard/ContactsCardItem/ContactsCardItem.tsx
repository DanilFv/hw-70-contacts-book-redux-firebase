import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import type {IContacts} from '../../../types';
import {noImage} from '../../../Constants.ts';
import * as React from 'react';

interface Props {
    contact: IContacts;
}

const ContactsCardItem: React.FC<Props> = ({contact}) => {
    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    mb: 2,
                    boxShadow: 6,
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    '&:hover': {
                        boxShadow: 12,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease-in-out',
                    },
                }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                    }}
                    image={contact.photo || noImage}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = noImage;
                    }}
                    alt={contact.name}
                />

                <Box sx={{ flex: 1, px: 2 }}>
                    <CardContent sx={{ p: '0 !important' }}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 'bold', mx: '20px' }}
                        >
                            {contact.name}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </>
    );
};

export default ContactsCardItem;