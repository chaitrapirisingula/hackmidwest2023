import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import logo from './logo.png';

const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();

  if (!authState) {
    return null;
  }

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <img src={logo} className="App-logo" alt="logo" />
            <Link to="/">Saving Face</Link>
          </Menu.Item>
          {authState.isAuthenticated && (
            <Menu.Item id="logout-button" onClick={logout}>Logout</Menu.Item>
          )}
          {!authState && !authState.isAuthenticated && (
            <Menu.Item onClick={login}>Login</Menu.Item>
          )}
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;
