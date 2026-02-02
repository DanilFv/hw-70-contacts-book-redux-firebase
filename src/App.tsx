import './App.css';
import NavBar from './components/NavBar/NavBar.tsx';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import ContactsPage from './containers/ContactsPage/ContactsPage.tsx';
import NewContactPage from './containers/NewContactPage/NewContactPage.tsx';
import EditContactPage from './containers/EditContactPage/EditContactPage.tsx';


const App = () => {


  return (
    <>
        <NavBar/>
        <Container>
            <Routes>
                <Route path='/' element={(<ContactsPage />)} />
                <Route path='/contacts/add-contact' element={(<NewContactPage />)} />
                <Route path='/contacts/:id/edit-contact' element={(<EditContactPage />)} />

                <Route path='*' element={(<Typography component='p' variant='h4' sx={{textAlign: 'center', mt: 3, fontWeight: 'medium'}}>Not found page!</Typography>)} />
            </Routes>
        </Container>
    </>
  )
};

export default App
