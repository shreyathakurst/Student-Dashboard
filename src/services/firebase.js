// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaw85uGD22cAgwIZwTkKOFunz5JeArU2Q",
  authDomain: "coursewise-b3584.firebaseapp.com",
  projectId: "coursewise-b3584",
  storageBucket: "coursewise-b3584.firebasestorage.app",
  messagingSenderId: "383625855131",
  appId: "1:383625855131:web:3ba567a8c6eb5eb312863e",
  measurementId: "G-XGBV12SG8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };