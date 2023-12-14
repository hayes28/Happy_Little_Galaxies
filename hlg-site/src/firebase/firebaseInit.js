import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Gn9qQ_3_EvldZ56Z8s9VFkSG3j6sb6o",
  authDomain: "happy-little-galaxies.firebaseapp.com",
  projectId: "happy-little-galaxies",
  // storageBucket: "happy-little-galaxies.appspot.com",
  // messagingSenderId: "181842198164",
  appId: "1:181842198164:web:eed9034cf047c303eafe81",
  measurementId: "G-KNV0XZKBM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Make Auth and Firestore references
export const auth = getAuth(app);
export const db = getFirestore(app);
