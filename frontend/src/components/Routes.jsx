import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import { RequiredAuth } from './SecureRoute';
import Home from '../pages/Home';
import Loading from './Loading';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import HealthForm from './HealthForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact={true} element={<Home/>}/>
      <Route path="login/callback" element={<LoginCallback loadingElement={<Loading/>}/>}/>
      <Route path="/profile" element={<RequiredAuth/>}>
        <Route path="" element={<Profile/>}/>
      </Route>
      <Route path="/edit" element={<RequiredAuth/>}>
        <Route path="" element={<HealthForm/>}/>
      </Route>
      <Route path="/admin" element={<RequiredAuth/>}>
        <Route path="" element={<Admin/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
