// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-immobilien.firebaseapp.com",
  projectId: "mern-immobilien",
  storageBucket: "mern-immobilien.firebasestorage.app",
  messagingSenderId: "324151218738",
  appId: "1:324151218738:web:1beb0668519373ecc4e22b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);