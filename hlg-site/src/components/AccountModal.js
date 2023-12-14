import React from 'react';
import './ModalStyles.css';

const AccountModal = ({ show, onClose, currentUser }) => {
  if (!show || !currentUser) return null;

  return (
    <div className={`modal ${show ? 'show-modal' : ''}`}>
        <div className={`modal-overlay ${show ? 'show-overlay' : ''}`} onClick={onClose}></div>
        <div className="modal-content modal-bg-color modal-account">
            <h4>Account Details</h4>
            <p>Logged in as {currentUser.email}</p>
        </div>
    </div>
  );
};

export default AccountModal;
