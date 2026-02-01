import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectContacts} from './ContactsSelectors.ts';
import {useEffect} from 'react';
import {fetchAllContacts} from './ContactsSlice.ts';


const ContactsPage = () => {
    const contactsSelector = useAppSelector(selectContacts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllContacts())
    }, [dispatch]);

    return (
        <>
            <Card sx={{ display: 'flex', width: '100%', maxWidth: '400px', alignItems: 'center', mt: 3, boxShadow: 3, overflow: 'hidden' }}>
            <CardMedia
                component="img"
                sx={{ width: 150, objectFit: 'cover', display: 'block' }}
                image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s'
                alt='12'
            />

            <Box sx={{ mx: 'auto' }}>
                <CardContent>
                    <Typography component="h4" variant="h4" gutterBottom sx={{ fontWeight: 'bold', mt: '15px'}}>
                        Hello
                    </Typography>
                </CardContent>
            </Box>
        </Card>
        </>
    );
};

export default ContactsPage;