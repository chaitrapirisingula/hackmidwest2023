import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

export default function UploadImageModal() {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState('No file selected.');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPhoto(null);
    setPhotoURL('');
    setFileName('No file selected.');
    setOpen(false);
  };

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
    }
  }

  return (
    <div>
      <Button variant='text' onClick={handleClickOpen}>Upload Image</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <form className='upload-section' onClick={() => document.querySelector('.input-field').click()}>
            <input type='file' accept='image/*' className='input-field' onChange={handleChange} hidden/>
            {photoURL ? <img src={photoURL} alt={fileName} width={156} height={156}/> : 
            <Box display='grid' justifyContent='center'><UploadIcon fontSize='large'/></Box>}
            <p>{fileName}</p>
          </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={loading || !photo} onClick={handleClick}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}