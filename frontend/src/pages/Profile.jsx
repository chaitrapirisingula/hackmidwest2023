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
  const [imageLoading, setImageLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState('No file selected.');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
      setSuccess(false);
    }
  }

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append('image', photo)
    
    try {
        setImageLoading(true);
        const endpoint = "http://127.0.0.1:8000/users/api/v1/profile/upload";
        await fetch(endpoint, {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then((data) => { 
          console.log(data);
          setSuccess(true);
        } );

    } catch(error) {
      console.error(error);
      setNoMatch(true);
    } finally {
      setImageLoading(false);
    }
  }

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
        <Button content='Edit Information' icon='edit' labelPosition='left' onClick={() => navigate('../../edit', {
          state: {
            info: userInfo
          }})}/>
        <br/><br/>
        <form className='upload-section' onClick={() => document.querySelector('.input-field').click()}>
            <input type='file' accept='image/*' className='input-field' onChange={handleChange} hidden/>
            {photoURL && !success ? <img src={photoURL} alt={fileName} width={156} height={156}/> : <Icon name="upload" size='large' />}
            {success ? <p>Uploaded!</p> : <></>}
            {imageLoading ? <p>Loading...</p> : <></>}
            <p>{fileName}</p>
        </form>
        <Button disabled={!photo} content='Upload Image' onClick={uploadImage}/>
        <br/><br/>
        <User patient={userInfo} />
      </div>
    </div>
  );
};

export default Profile;
