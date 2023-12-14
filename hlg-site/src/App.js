import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebaseInit';
import M from 'materialize-css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    // Materialize Modal Initialization
      var modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);

    // Cleanup function for Firebase Auth Listener
    return () => unsubscribe();
  }, []);

  const handleShowSignUp = () => {
    // console.log('Opening Sign Up Modal');
    setShowSignUpModal(true);
  };
  const handleShowLogin = () => {
    // console.log('Opening Login Modal');
    setShowLoginModal(true);
  };
  const handleCloseSignUp = () => {
    // console.log('Closing Sign Up Modal');
    setShowSignUpModal(false);
  };
  const handleCloseLogin = () => {
    // console.log('Closing Login Modal');
    setShowLoginModal(false);
  }

  return (
    <div>
      <Navbar
        currentUser={currentUser}
        handleShowSignUp={handleShowSignUp}
        handleShowLogin={handleShowLogin}
      />
      {showSignUpModal && <SignUpModal show={showSignUpModal} onClose={handleCloseSignUp} />}
      {showLoginModal && <LoginModal show={showLoginModal} onClose={handleCloseLogin} />}
    </div>
  );
};

export default App;
