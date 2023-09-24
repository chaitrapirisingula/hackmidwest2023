import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Header, Icon } from 'semantic-ui-react';
import User from '../components/User';

const temp = [
  {
    "firstName": "Jack",
    "lastName": "Rankin",
    "admin": "0",
    "sex": "Male",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "dob": "1990-05-15",
    "race": "Caucasian",
    "bloodType": "A+",
    "weight": "70 kg",
    "height": "175 cm",
    "allergies": ["Peanuts", "Shellfish"],
    "conditions": ["Hypertension", "Diabetes"],
    "medication": ["Lisinopril", "Insulin"],
    "surgeries": ["Appendectomy", "Knee Surgery"],
    "emergencyContacts": ["Jane Doe (+11234567890)", "Emergency Contact 2 (+19876543210)"]
  },
  {
    "firstName": "Chaitra",
    "lastName": "Pirisingula",
    "admin": "1",
    "sex": "Female",
    "email": "jane.smith@example.com",
    "phone": "+9876543210",
    "address": "456 Elm St, City, Country",
    "dob": "1985-08-25",
    "race": "African American",
    "bloodType": "B-",
    "weight": "65 kg",
    "height": "160 cm",
    "allergies": ["None"],
    "conditions": ["Asthma"],
    "medication": ["Albuterol"],
    "surgeries": ["None"],
    "emergencyContacts": ["John Smith (+11234567890)"]
  }
];

const Profile = () => {
  const navigate = useNavigate();

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(temp[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      // get user information from `/userinfo` endpoint
      setLoading(true);
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        setLoading(false);
        if (temp[1].admin == true) return navigate('/admin');
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

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
            {userInfo.name}
        </Header>
        <p>
          Welcome back!
          Below is your current health information. 
          This information is protected and only accessible to you and medical professionals.
        </p>
        <User patient={temp[0]} />
      </div>
    </div>
  );
};

export default Profile;
