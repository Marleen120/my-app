// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjaTbywoR1hjwlG83GJ2gD0pftqtj4VDM",
  authDomain: "paper-2f829.firebaseapp.com",
  projectId: "paper-2f829",
  storageBucket: "paper-2f829.appspot.com",
  messagingSenderId: "767352145019",
  appId: "1:767352145019:web:a92241dfd1eb6b89118ede",
  measurementId: "G-N1CQ6FYLGB"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth=getAuth(app);


export  {app,auth};