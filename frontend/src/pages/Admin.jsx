import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Button, Icon } from 'semantic-ui-react';
import User from '../components/User';
import Loading from '../components/Loading';

const Admin = () => {
  const navigate = useNavigate();

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(false);

  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState('No file selected.');
  const [foundUser, setFoundUser] = useState(null);
  const [noMatch, setNoMatch] = useState(false);

  if (authState && !authState.isAuthenticated) {
    return navigate('../profile');
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
    }
  }

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file_upload', photo)
    
    try {
        setLoading(true);
        const endpoint = "http://localhost:8000/upload_file";
        const response = await fetch(endpoint, {
            method: "POST",
            body: formData
        });
        // Verify this!!!!
        console.log(response);
        setFoundUser(response);

        if (!response.ok) {
          console.error('An error occured!');
          setNoMatch(true);
        }

    } catch(error) {
      console.error(error);
      setNoMatch(true);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      // get user information from `/userinfo` endpoint
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        if (!info.admin || info.admin == false) return navigate('../profile');
        console.log(userInfo);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  return (
    <div className='admin'>
        <h1>Upload Image</h1>
        <form className='upload-section' onClick={() => document.querySelector('.input-field').click()}>
            <input type='file' accept='image/*' className='input-field' onChange={handleChange} hidden/>
            {photoURL ? <img src={photoURL} alt={fileName} width={156} height={156}/> : <Icon name="upload" size='large' />}
            <p>{fileName}</p>
        </form>
        <Button secondary disabled={loading || !photo} onClick={uploadImage}>Find Match</Button>
        {foundUser ? <User data={foundUser} /> : <></>}
        {loading ? <Loading/> : <></>}
        {noMatch ? <h1>No match found.</h1> : <></>}
    </div>
  );
};

export default Admin;
