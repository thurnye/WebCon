import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from 'pages/Profile/Profile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {themeSettings} from './theme';


const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/user' element={<Profile/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
