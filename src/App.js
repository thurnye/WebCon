import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Profile from 'pages/Profile/Profile';
import NavBar from './components/navBar/navBar';
import PrivateRoute from 'pages/PrivateRoute/PrivateRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeSettings } from './theme';

const App = () => {
  const user = useSelector(state => state.user);
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <NavBar/>
          <Routes>
            <Route path='/' element={<PrivateRoute element={<Home/>} />} />
            <Route path='/user' element={<PrivateRoute element={<Profile/>} />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
