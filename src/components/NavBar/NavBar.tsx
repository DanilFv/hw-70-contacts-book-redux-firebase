import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                <Typography
                    variant="h6"
                    component={NavLink} to='/'
                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
                >
                    Contacts
                </Typography>

                    <Button
                        sx={{ mx: 'auto', color: 'white' }}
                        variant="outlined"
                        type="button"
                        component={NavLink}
                        to='/contacts/add-contact'
                    >
                        add contact
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;