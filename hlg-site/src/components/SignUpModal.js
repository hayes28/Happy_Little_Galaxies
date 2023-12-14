import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebaseInit'; // Make sure the path is correct

const SignUpModal = ({ show, onClose }) => {
  console.log('SignUpModal show:', show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onClose(); // Close the modal
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Sign up</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="email"
              id="signup-email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="signup-email">Email address</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              id="signup-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="signup-password">Choose password</label>
          </div>
          <button type="submit" className="btn yellow darken-2 z-depth-0">Sign up</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
