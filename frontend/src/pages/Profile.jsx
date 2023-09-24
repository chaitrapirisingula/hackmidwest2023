import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Button, Header, Icon } from 'semantic-ui-react';
import User from '../components/User';

const Profile = () => {
  const navigate = useNavigate();

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      // get user information from `/userinfo` endpoint
      oktaAuth.getUser().then((info) => {
        getUser(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const getUser = async (user) => {
    setLoading(true);
    try {
        const endpoint = "http://127.0.0.1:8000/users/api/v1/get_user/" + user.sub;
        console.log(user);
        await fetch(endpoint, {
            method: "GET",
        })
        .then(response => response.json())
        .then((data) => { 
          setUserInfo(data);
          if (data.admin === true) return navigate('/admin');
        });

    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!userInfo || loading) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="drivers license" />
            {userInfo.firstName + ' ' + userInfo.lastName}
        </Header>
        <p>
          Welcome back!
          Below is your current health information. 
          This information is protected and only accessible to you and medical professionals.
        </p>
        {/* send params of user id */}
        <Button content='Edit Information' icon='edit' labelPosition='left' onClick={() => navigate('/edit')}/>
        <br/><br/>
        <User patient={userInfo} />
      </div>
    </div>
  );
};

export default Profile;
