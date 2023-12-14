import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import AccountModal from './components/AccountModal';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebaseInit';
import M from 'materialize-css';
import "./components/FilterStyles.css";
import Gallery from './components/Gallery';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthStatusKnown, setIsAuthStatusKnown] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  useEffect(() => {
    // Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setIsAuthStatusKnown(true); // Auth status is now known
    });

    // Materialize Modal Initialization
      var modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);

    // Cleanup function for Firebase Auth Listener
    return () => unsubscribe();
  }, []);

  const handleShowSignUp = () => {
    setShowLoginModal(false); // Close login modal if open
    setShowSignUpModal(true); // Open sign up modal
  };
  const handleShowLogin = () => {
    setShowSignUpModal(false); // Close sign up modal if open
    setShowLoginModal(true); // Open login modal
  };
  const handleShowAccount = () => {
    // Close other modals if open and open account modal
    setShowLoginModal(false);
    setShowSignUpModal(false);
    setShowAccountModal(true);
  };
  const handleCloseSignUp = () => setShowSignUpModal(false);
  const handleCloseLogin = () => setShowLoginModal(false);
  const handleCloseAccount = () => setShowAccountModal(false);

  return (
    <div>
      <Navbar
        currentUser={currentUser}
        handleShowSignUp={handleShowSignUp}
        handleShowLogin={handleShowLogin}
        isAuthStatusKnown={isAuthStatusKnown}
        handleShowAccount={handleShowAccount}
      />
      {showSignUpModal && <SignUpModal show={showSignUpModal} onClose={handleCloseSignUp} />}
      {showLoginModal && <LoginModal show={showLoginModal} onClose={handleCloseLogin} />}
      {showAccountModal && <AccountModal show={showAccountModal} onClose={handleCloseAccount} currentUser={currentUser} />}
      <Gallery />
    </div>
  );
};

export default App;
