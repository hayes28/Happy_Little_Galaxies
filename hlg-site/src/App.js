import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebaseInit';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleShowSignUp = () => setShowSignUpModal(true);
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseSignUp = () => setShowSignUpModal(false);
  const handleCloseLogin = () => setShowLoginModal(false);

  return (
    <div>
      <Navbar
        currentUser={currentUser}
        handleShowSignUp={handleShowSignUp}
        handleShowLogin={handleShowLogin}
      />
      <SignUpModal show={showSignUpModal} onClose={handleCloseSignUp} />
      <LoginModal show={showLoginModal} onClose={handleCloseLogin} />
      {/* ... other components ... */}
    </div>
  );
};

export default App;
