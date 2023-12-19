import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseInit';
import './ModalStyles.css';

const LoginModal = ({ show, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onClose(); // Close the modal
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (!show) {
    return null;
  }

  return (
    <div className={`modal ${show ? 'show-modal' : ''}`}>
      <div className={`modal-overlay ${show ? 'show-overlay' : ''}`} onClick={onClose}></div>
      <div className="modal-content modal-bg-color">
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="email"
              id="login-email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="login-email">Email address</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              id="login-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="login-password">Your password</label>
          </div>
          <button type="submit" className="modal-submit-btn waves-effect waves-light">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
