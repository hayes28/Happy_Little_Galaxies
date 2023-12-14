import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebaseInit';

const Navbar = ({ currentUser, handleShowSignUp, handleShowLogin }) => {
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <nav style={{ backgroundColor: '#303A52' }}>
      <div className="nav-wrapper container">
        <a href="#" className="brand-logo" style={{ fontFamily: 'Rock Salt', color: '#9E579D' }}>
          Happy Little Galaxies
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {currentUser ? (
            <>
              <li><a href="#" style={{ color: '#E4CCFF' }}>Account</a></li>
              <li><a href="#" style={{ color: '#E4CCFF' }} onClick={handleLogout}>Logout</a></li>
            </>
          ) : (
            <>
              <li><a href="#" style={{ color: '#E4CCFF' }} onClick={handleShowLogin}>Login</a></li>
              <li><a href="#" style={{ color: '#574B90', backgroundColor: '#E4CCFF' }} onClick={handleShowSignUp}>Sign up</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
