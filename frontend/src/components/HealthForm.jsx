import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Form, Input, Button, Select } from 'semantic-ui-react';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

const HealthForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation()

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(state.info);

    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      // get user information from `/userinfo` endpoint
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        console.log(userInfo);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const handleFormSubmit = async () => {
    try {
      console.log( formData);
      const endpoint = "http://127.0.0.1:8000/users/api/v1/update/";
      let user = formData
      await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then((data) => { 
        console.log(data);
        // return navigate('../../profile');
      });
    } catch(error) {
      console.error(error);
    } 
    
  };

  const handleInputChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  if (!formData) {
    return (<></>);
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Field
          name='phone'
          control={Input}
          label='Phone Number'
          placeholder={formData.phone}
          value={formData.phone}
          onChange={handleInputChange}
        />
        <Form.Field
          name='address'
          control={Input}
          label='Address'
          placeholder={formData.address}
          value={formData.address}
          onChange={handleInputChange}
        />
        <Form.Field
          name='birthday'
          control={Input}
          label='Date of Birth'
          placeholder={formData.birthday}
          value={formData.birthday}
          onChange={handleInputChange}
        />
        </Form.Group>
        <Form.Group>
        <Form.Field
          name='sex'
          control={Select}
          options={genderOptions}
          label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
          placeholder={formData.sex}
          search
          searchInput={{ id: 'form-select-control-gender' }}
          value={formData.sex}
          onChange={(_, { value }) => setFormData({ ...formData, sex: value })}
        />
      <Form.Field
          name='contact'
          control={Input}
          label='Emergency Contact'
          placeholder={formData.contact}
          value={formData.contact}
          onChange={handleInputChange}
        />
        <Form.Field
          name='race'
          control={Input}
          label='Race'
          placeholder={formData.race}
          value={formData.race}
          onChange={handleInputChange}
        />
        </Form.Group>
        <Form.Group>
        <Form.Field
          name='bloodType'
          control={Input}
          label='Blood Type'
          placeholder={formData.bloodType}
          value={formData.bloodType}
          onChange={handleInputChange}
        />
        <Form.Field
          name='weight'
          control={Input}
          label='Weight'
          placeholder={formData.weight}
          value={formData.weight}
          onChange={handleInputChange}
        />
        <Form.Field
          name='height'
          control={Input}
          label='Height'
          placeholder={formData.height}
          value={formData.height}
          onChange={handleInputChange}
        />
        </Form.Group>
        <Form.Group>
        <Form.Field
          name='conditions'
          control={Input}
          label='Medical Conditions'
          placeholder={formData.conditions}
          value={formData.conditions}
          onChange={handleInputChange}
        />
        <Form.Field
          name='medication'
          control={Input}
          label='Medications'
          placeholder={formData.medication}
          value={formData.medication}
          onChange={handleInputChange}
        />
        <Form.Field
          name='surgeries'
          control={Input}
          label='Surgeries'
          placeholder={formData.surgeries}
          value={formData.surgeries}
          onChange={handleInputChange}
        />
        </Form.Group>
      <Form.Field
        id='form-button-control-public'
        control={Button}
        content='Confirm'
        label='Submit'
        type='submit'
      />
    </Form>
  );
};

export default HealthForm;

