// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, signOut} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhTUvYBGvpw3CBvlK0xCLyhZiFUQP4xVE",
  authDomain: "project-fiv.firebaseapp.com",
  projectId: "project-fiv",
  storageBucket: "project-fiv.firebasestorage.app",
  messagingSenderId: "768833233493",
  appId: "1:768833233493:web:66f5afa9168d37ec706adc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);