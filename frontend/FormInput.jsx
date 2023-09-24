import React, { useState } from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

const FormExampleFieldControlId = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const handleFormSubmit = () => {
    console.log(formData);
  };

  const handleInputChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group widths='equal'>
        <Form.Field
          name='phoneNumber'
          control={Input}
          label='Phone Number'
          placeholder='Phone Number'
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <Form.Field
          name='address'
          control={Input}
          label='Address'
          placeholder='Address'
          value={formData.address}
          onChange={handleInputChange}
        />
        <Form.Field
          name='dateOfBirth'
          control={Input}
          label='Date of Birth'
          placeholder='MM-DD-YYYY'
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
        <Form.Field
          name='gender'
          control={Select}
          options={genderOptions}
          label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
          placeholder='Gender'
          search
          searchInput={{ id: 'form-select-control-gender' }}
          value={formData.gender}
          onChange={(_, { value }) => setFormData({ ...formData, gender: value })}
        />
      </Form.Group>
      <Form.Field
        name='email'
        control={Input}
        label='Email'
        placeholder='joe@schmoe.com'
        error={{
          content: 'Please enter a valid email address',
          pointing: 'below',
        }}
        value={formData.email}
        onChange={handleInputChange}
      />
      <Form.Field
          name='emergencyContactName'
          control={Input}
          label='Emergency Contact Name'
          placeholder='Emergency Contact Name'
          value={formData.emergencyContactName}
          onChange={handleInputChange}
        />
        <Form.Field
          name='emergencyContactPhone'
          control={Input}
          label='Emergency Contact Phone'
          placeholder='Emergency Contact Phone'
          value={formData.emergencyContactPhone}
          onChange={handleInputChange}
        />
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

export default FormExampleFieldControlId;

