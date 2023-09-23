import React from 'react';
import logo from '../../logo.png';
import UploadImageModal from '../layout/UploadImageModal';

export default function Login() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Saving Face</p>
        <UploadImageModal />
    </div>
  );
}
