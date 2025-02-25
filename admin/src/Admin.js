import React, { useState } from 'react';
import Profile from './Profile';

function Admin() {

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
      setFoundUser(null);
      setNoMatch(false);
    }
  }

  const uploadImage = async () => {
    try {
        setLoading(true);
        let formData = new FormData();
        formData.append('image', photo)
        const endpoint = "http://127.0.0.1:8000/users/api/v1/profile/admin/upload";
        await fetch(endpoint, {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then((data) => { 
            console.log(data);
            // Update endpoint to 404 error
            if (data) {
                setFoundUser(data);
            } else {
                setNoMatch(true);
            }
        } );

    } catch(error) {
      console.error(error);
      setNoMatch(true);
      setFoundUser(null);
    } finally {
      setLoading(false);
      console.log(foundUser);
    }
  }

  return (
    <div>
        <h1>Upload Image</h1>
        <form className='upload-section' onClick={() => document.querySelector('.input-field').click()}>
            <input type='file' accept='image/*' className='input-field' onChange={handleChange} hidden/>
            {photoURL ? <img src={photoURL} alt={fileName} style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '20px' }} /> : 
                <div>
                    Select file
                </div>
            }
            {fileName && <p style={{ fontSize: '24px', marginBottom: '10px', marginLeft: '20px'}}>{fileName}</p>}
        </form>
        <button disabled={!photoURL} onClick={uploadImage}>Find Match</button>
        {foundUser?.firstName}
        {foundUser ? <Profile patient={foundUser} /> : <></>}
        {noMatch && !loading ? <p style={{ fontSize: '24px', color: 'red', marginTop: '20px' }}>No match found.</p> : <></>}
    </div>
  );

};

export default Admin;