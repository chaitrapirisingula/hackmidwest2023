import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Icon } from 'semantic-ui-react';

const Admin = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState('No file selected.');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleClick = async () => {
    const formData = new FormData();
    formData.append('file_upload', photo)
    
    try {
        setLoading(true);
        const endpoint = "http://localhost:8000/upload_file";
        const response = await fetch(endpoint, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            console.error('An error occured!');
        }

    } catch(error) {
      console.error(error)
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
    //   setUserInfo(null);
    } else {
      // get name and id from this 
      // setUserInfo(authState.idToken.claims);
      // get user information from `/userinfo` endpoint
      /*oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });*/
    }
  }, [authState, oktaAuth]); // Update if authState changes

//   if (!userInfo) {
//     return (
//       <div>
//         <p>Fetching user profile...</p>
//       </div>
//     );
//   }

  return (
    <div className='admin'>
        <h1>Upload Image</h1>
        <form className='upload-section' onClick={() => document.querySelector('.input-field').click()}>
            <input type='file' accept='image/*' className='input-field' onChange={handleChange} hidden/>
            {photoURL ? <img src={photoURL} alt={fileName} width={156} height={156}/> : <Icon name="upload large" />}
            <p>{fileName}</p>
        </form>
        <button disabled={loading || !photo} onClick={handleClick}>Find Match</button>
    </div>
  );
};

export default Admin;
