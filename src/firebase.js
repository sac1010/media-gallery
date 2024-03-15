// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "gallery-app-4a529.firebaseapp.com",
  projectId: "gallery-app-4a529",
  storageBucket: "gallery-app-4a529.appspot.com",
  messagingSenderId: "416369007800",
  appId: "1:416369007800:web:e59df2ac5ce38b0178a84d",
  measurementId: "G-C5JZ1Q7G1J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
