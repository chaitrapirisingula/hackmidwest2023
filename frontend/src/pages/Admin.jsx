import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Button, Icon } from 'semantic-ui-react';
import User from '../components/User';

const Admin = () => {
  const navigate = useNavigate();

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(false);
  const [accLoading, setAccLoading] = useState(true);

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
        await fetch(endpoint, {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then((data) => { 
          console.log(data);
          setFoundUser(data);
          if (!data || data.length === 1) {
            setNoMatch(true);
          }
        } );

    } catch(error) {
      console.error(error);
      setNoMatch(true);
    } finally {
      setLoading(false);
      console.log(foundUser);
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
        getUser(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const getUser = async (user) => {
    try {
        const endpoint = "http://127.0.0.1:8000/users/api/v1/get_user/" + user.sub;
        console.log(user);
        await fetch(endpoint, {
            method: "GET",
        })
        .then(response => response.json())
        .then((data) => { 
          setUserInfo(data);
          console.log(data.admin);
          if (data.admin !== '1') return navigate('/profile');
        });

    } catch(error) {
      console.error(error);
    } finally {
      setAccLoading(false);
    }
  }

  return (
    <div>
      {!accLoading ?
      <div className='healthcare-app' style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        background: '#f0f0f0',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
    }}>
        <h1>Upload Medical Image</h1>
        <form className='upload-section' onClick={() => document.querySelector('.input-field').click()}>
            <input type='file' accept='image/*' className='input-field' onChange={handleChange} hidden/>
            {photoURL ? <img src={photoURL} alt={fileName} style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '20px' }} /> : 
                <div style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #3498db', borderRadius: '5px' }}>
                    <Icon name="upload" style={{ fontSize: '4em', color: '#3498db' }} />
                </div>
            }
            {fileName && <p style={{ fontSize: '24px', marginBottom: '10px', marginLeft: '20px'}}>{fileName}</p>}
        </form>
        <button style={{ 
            background: photoURL ? '#3498db' : 'gray', // Set background to gray when no file is uploaded
            color: 'white',
            fontSize: '20px',
            border: 'none',
            borderRadius: '5px',
            cursor: photoURL ? 'pointer' : 'not-allowed', // Change cursor based on file selection,
            marginBottom : "20px"
            }} 
            disabled={!photoURL} onClick={uploadImage}>
            Find Match
        </button>
        {foundUser && foundUser.firstName ? <User patient={foundUser} style={{ backgroundColor: 'lightblue', fontSize: '18px', width:'200px' }} /> : <></>}
        {noMatch && !loading ? <p style={{ fontSize: '24px', color: 'red', marginTop: '20px' }}>No match found.</p> : <></>}
    </div> : <></>}
    </div>
  );
};

export default Admin;