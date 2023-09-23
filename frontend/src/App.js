import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import NavBar from './components/layout/NavBar';
import Admin from './components/pages/Admin';
import User from './components/pages/User';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import './App.css';

function App() {

  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth,  originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Router>
      <Security
        oktaAuth="https://dev-jm8z17sdj6ijt88b.us.auth0.com/"
        restoreOriginalUri={restoreOriginalUri}
      >
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <SecureRoute path="/admin" element={<Admin/>} />
          <Route path="/user" element={<User/>} />
          <Route
            path="/login"
            element={<Login baseUrl="https://dev-jm8z17sdj6ijt88b.us.auth0.com" />}
          />
          <Route path="/implicit/callback" component={LoginCallback} />
        </Routes>
      </div>
      </Security>
    </Router>
  );
}

export default App;
