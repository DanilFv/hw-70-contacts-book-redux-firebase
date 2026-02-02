import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {MODAL_STYLES, noImage} from '../../../Constants.ts';
import type {IContacts} from '../../../types';
import {Button, CardMedia} from '@mui/material';
import * as React from 'react';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import {NavLink} from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


interface Props {
    open: boolean;
    onClose: () => void;
    contact: IContacts;
    onDelete: (id: string) => void;
    isLoading: boolean;
}


const ModalWindow: React.FC<Props> = ({open, contact, onClose, onDelete, isLoading}) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={MODAL_STYLES}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '25px' }}>
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant='h5' component='h5' sx={{ fontWeight: 'bold', mb: 2 }}>
                                {contact.name}
                            </Typography>
                            <Typography variant='body1' component='p' color='primary'>
                                {contact.phone}
                            </Typography>
                            <Typography variant='body1' component='p' color='primary'>
                                {contact.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Button
                            sx={{ mr: 1 }}
                            type='button'
                            startIcon={<EditDocumentIcon />}
                            variant="outlined"
                            component={NavLink}
                            to={`/contacts/${contact.id}/edit-contact`}
                        >
                            Edit
                        </Button>

                         <Button
                            type='button'
                            startIcon={<DeleteForeverIcon />}
                            variant="outlined"
                            color='error'
                            onClick={() => onDelete(contact.id)}
                            loading={isLoading}
                            loadingPosition="start"
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalWindow;
