import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebaseInit';
import './Navbar.css';

const Navbar = ({ currentUser, handleShowSignUp, handleShowLogin }) => {
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <nav style={{ backgroundColor: '#303A52' }}>
      <div className="nav-wrapper container">
        <span className="brand-logo">Happy Little Galaxies</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {currentUser ? (
            <>
              <li><button className="nav-button btn-account" onClick={() => {}} >Account</button></li>
              <li><button className="nav-button btn-logout" onClick={handleLogout} >Logout</button></li>
            </>
          ) : (
            <>
              <li><button className="nav-button btn-login" onClick={handleShowLogin}>Login</button></li>
              <li><button className="btn-signup" onClick={handleShowSignUp}>Sign up</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
