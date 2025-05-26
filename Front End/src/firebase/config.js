// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  authDomain: "floreria-digital.firebaseapp.com",
  projectId: "floreria-digital",
  storageBucket: "floreria-digital.firebasestorage.app",
  messagingSenderId: "817341793443",
  appId: "1:817341793443:web:48a0221a27d583c7282b16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
