import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const Home = () => {
  const navigate = useNavigate();

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        // do this if not admin
        return navigate('/profile');
        // navigate to admin if admin
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div> 
      {!authState.isAuthenticated ? <Button id="login-button" primary onClick={login}>Login</Button>
      : <div>Loading...</div>}
    </div>
  );
};
export default Home;
