// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "coding-projects-738e0.firebaseapp.com",
  projectId: "coding-projects-738e0",
  storageBucket: "coding-projects-738e0.appspot.com",
  messagingSenderId: "934561198435",
  appId: "1:934561198435:web:7d82763236ade4d4842356",
  measurementId: "G-7LXX6HJ95W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);