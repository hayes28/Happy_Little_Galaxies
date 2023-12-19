import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/firebaseInit';
import './Navbar.css';

const Navbar = ({ currentUser, handleShowSignUp, handleShowLogin, isAuthStatusKnown, handleShowAccount }) => {
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <>
      <nav style={{ backgroundColor: '#303A52' }}>
        <div className="nav-wrapper container">
          <span className="brand-logo">Happy Little Galaxies</span>
          <a href="!#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {isAuthStatusKnown && (
              currentUser ? (
              <>
                <li><button className="nav-button btn-account waves-effect waves-light" onClick={handleShowAccount} >Account</button></li>
                <li><button className="nav-button btn-logout waves-effect waves-light" onClick={handleLogout} >Logout</button></li>
              </>
            ) : (
              <>
                <li><button className="nav-button btn-login waves-effect waves-light" onClick={handleShowLogin}>Login</button></li>
                <li><button className="btn-signup waves-effect waves-light" onClick={handleShowSignUp}>Sign up</button></li>
              </>
            )
            )}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo" style={{ backgroundColor: '#303A52' }}>
        {isAuthStatusKnown && (
          currentUser ? (
          <>
            <li><button className="nav-button btn-account" onClick={handleShowAccount} >Account</button></li>
            <li><button className="nav-button btn-logout" onClick={handleLogout} >Logout</button></li>
          </>
        ) : (
          <>
            <li><button className="nav-button btn-login" onClick={handleShowLogin}>Login</button></li>
            <li><button className="btn-signup" onClick={handleShowSignUp}>Sign up</button></li>
          </>
        )
        )}
      </ul>
    </>
  );
};

export default Navbar;
