import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';



const PrivateRoute = ({ path, element }) => {
  const user = useSelector(state => state.user);
  
  const isLoggedIn = () => {
    // const token = localStorage.getItem('token');
    // return token !== null && token !== undefined;
    return user ? true : false
  };
  if (isLoggedIn()) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
