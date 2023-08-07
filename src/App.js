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
import NoMatch from 'pages/NoMatch/NoMatch';

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = useSelector((state) => state.user);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <NavBar/>
          <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path='/' element={<Home/>} />
              <Route path='profile' element={<Profile/>} />
            </Route>
            <Route path='/login' element={<Login/>}/>
            {!user && <>
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
            </>}
            <Route path="*" element={<NoMatch />} />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
