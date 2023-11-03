// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCphaaxTjC45kGcOIU3F9KQuw09Inp5mGA",
  authDomain: "cdbrs-system.firebaseapp.com",
  projectId: "cdbrs-system",
  storageBucket: "cdbrs-system.appspot.com",
  messagingSenderId: "460385481077",
  appId: "1:460385481077:web:9f0316208084609840233c",
  measurementId: "G-WBXH7HHMGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);