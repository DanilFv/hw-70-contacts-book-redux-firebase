import type {IContactForm} from '../../types';
import {useForm} from 'react-hook-form';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks.ts';
import SaveIcon from '@mui/icons-material/Save';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface Props {
    isEdit?: boolean;
    contactId: string;
    initialValues?: IContactForm;
}


const ContactForm: React.FC<Props> = ({isEdit, contactId, initialValues}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const emptyValues: IContactForm = {
        name: '',
        phone: '',
        email: '',
        photo: '',
    };

    const {register, handleSubmit, reset, formState: {errors}} = useForm<IContactForm>({
            defaultValues: emptyValues,
    });

    const onSubmit = (data: IContactForm) => {

    };


    return (
        <Box sx={{ mt: 4 }}>
            <form>
                <Typography component="h4" variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
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
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                </Grid>

                 <Grid size={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Photo'
                        {...register('photo')}
                    />
                </Grid>

                <Grid size={12}>
                    <Button
                        type='button'
                        loading
                        loadingPosition="start"
                        startIcon={isEdit ? <EditDocumentIcon /> : <SaveIcon />}
                        variant="outlined"
                    >
                        {isEdit ? 'Edit Contact' : 'Add Contact'}
                    </Button>

                     <Button
                        variant="outlined"
                        type="button"
                        startIcon={<ArrowBackIosIcon />}
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