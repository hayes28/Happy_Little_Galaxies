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
        <span className="brand-logo" style={{ fontFamily: 'Rock Salt', color: '#9E579D' }}>
          Happy Little Galaxies
        </span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {currentUser ? (
            <>
              <li><button onClick={() => {}} style={{ color: '#E4CCFF' }}>Account</button></li>
              <li><button onClick={handleLogout} style={{ color: '#E4CCFF' }}>Logout</button></li>
            </>
          ) : (
            <>
              <li><button onClick={handleShowLogin} style={{ color: '#E4CCFF' }}>Login</button></li>
              <li><button onClick={handleShowSignUp} style={{ color: '#574B90', backgroundColor: '#E4CCFF' }}>Sign up</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
