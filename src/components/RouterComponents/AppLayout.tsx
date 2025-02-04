import { Container } from '@mui/material';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import { useReducer } from 'react';
import { initialUserState, userReducer } from '../../types/user';
import { UserContext } from '../../context/UserContext';

function AppLayout() {

  const [user, userDispatch] = useReducer(userReducer, initialUserState)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
    <UserContext value={{ user, userDispatch }}>
      <NavBar />
      <HomePage/>
      <Container sx={{ marginTop: 10 }}>
        <Outlet />
      </Container>
      </UserContext>
    </div>
  );
}

export default AppLayout;
