import type {IContactForm} from '../../types';
import {useForm} from 'react-hook-form';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import SaveIcon from '@mui/icons-material/Save';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {fetchAddContact} from '../../containers/ContactsPage/ContactsSlice.ts';
import {
    selectIsAddLoading
} from '../../containers/ContactsPage/ContactsSelectors.ts';
import * as React from 'react';
import {useEffect} from 'react';
import {EMPTY_VALUES} from '../../Constants.ts';

interface Props {
    isEdit?: boolean;
    contactId?: string;
    initialValues?: IContactForm;
}


const ContactForm: React.FC<Props> = ({isEdit, contactId, initialValues}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAddLoadingSelector = useAppSelector(selectIsAddLoading);

    const {register, handleSubmit, reset, formState: {errors}} = useForm<IContactForm>({
            defaultValues: EMPTY_VALUES,
    });

    const onSubmit = (data: IContactForm) => {
        if (isEdit && contactId) {
            console.log(data);
        } else {
            dispatch(fetchAddContact(data))
            navigate('/');
        }
    };

    useEffect(() => {
        if (isEdit && initialValues) {
            reset(initialValues);
        } else {
            reset(EMPTY_VALUES);
        }
    }, [initialValues, isEdit, reset]);


    return (
        <Box sx={{ mt: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography component="h4" variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
                    {isEdit ? 'Edit Contact' : 'Add Contact'}
                </Typography>

            <Grid container spacing={2}>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Name'
                        {...register('name', {
                            required: 'Это обязательное поле!',
                            minLength: {
                                value: 3,
                                message: 'Минимум 3 символа'
                            },
                            setValueAs: (value: string) => value?.trim() ?? '',
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        disabled={isAddLoadingSelector}
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Phone'
                        {...register('phone', {
                            required: 'Это обязательное поле!',
                            pattern: {
                                value: /^\+996\d{9}$/,
                                message: 'Формат: +996XXXXXXXXX!'
                            },
                        })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        disabled={isAddLoadingSelector}
                    />
                </Grid>

                 <Grid size={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='email'
                        {...register('email', {
                            required: 'Это обязательное поле!',
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: 'Некорректный email!'
                            },
                            setValueAs: (value: string) => value.trim() ?? ''
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={isAddLoadingSelector}
                    />
                </Grid>

                 <Grid size={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Photo'
                        {...register('photo')}
                        disabled={isAddLoadingSelector}
                    />
                </Grid>

                <Grid size={12}>
                    <Button
                        type='submit'
                        loading={isAddLoadingSelector}
                        loadingPosition="start"
                        startIcon={isEdit ? <EditDocumentIcon /> : <SaveIcon />}
                        variant="outlined"
                    >
                        {isEdit ? 'Edit Contact' : 'Add Contact'}
                    </Button>

                     <Button
                         loading={isAddLoadingSelector}
                         loadingPosition='start'
                         sx={{ mx: 2 }}
                         variant="outlined"
                         type="button"
                         startIcon={<ArrowBackIosIcon />}
                         component={NavLink}
                         to='/'
                    >
                        Back to contacts
                    </Button>
                </Grid>
            </Grid>
            </form>
        </Box>
    );
};

export default ContactForm;