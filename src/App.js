import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from 'pages/Profile/Profile';



const App = () => {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/user' element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
