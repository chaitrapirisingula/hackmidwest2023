import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Header, Icon } from 'semantic-ui-react';
import User from '../components/User';

const temp = {
  "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
  "admin" : "0",
  "firstName": "Chaitra",
  "lastName": "Pirisingula",
  "image": "...",
  "sex" : "...",
  "email":  "...",
  "phone":  "...",
  "address":  "...",
  "birthday":  "...",
  "race":  "...",
  "bloodType":  "...",
  "weight":  "...",
  "height":  "...",
  "allergies":  "...",
  "conditions":  "...",
  "surgeries":  "...",
  "medication":  "...",
  "contact": "..."
};

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(temp);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      // get name and id from this 
      // setUserInfo(authState.idToken.claims);
      // get user information from `/userinfo` endpoint
      /*oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });*/
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
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
        <User userInfo={userInfo} />
      </div>
    </div>
  );
};

export default Profile;
