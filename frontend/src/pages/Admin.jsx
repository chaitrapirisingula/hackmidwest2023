import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Icon } from 'semantic-ui-react';
import User from '../components/User';

const Admin = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(false);

  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState('No file selected.');
  const [foundUser, setFoundUser] = useState(null);
  const [noMatch, setNoMatch] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
    }
  }



  const uploadImage = async () => {
    let formData = new FormData();
    
    formData.append('image', photo)
    
    try {
        setLoading(true);
        const endpoint = "http://127.0.0.1:8000/users/api/v1/profile/admin/upload";
        const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
              
        });
        // Verify this!!!!
        console.log(response.json());
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
        <button disabled={loading || !photo} onClick={uploadImage}>Find Match</button>
        {foundUser ? <User data={foundUser} /> : <></>}
        {noMatch ? <h1>No match found.</h1> : <></>}
    </div>
  );
};

export default Admin;
