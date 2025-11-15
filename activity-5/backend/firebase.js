// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNTt3THv8eBkJb0erzPgOYTyp9u0ok2VY",
  authDomain: "projects-39a99.firebaseapp.com",
  projectId: "projects-39a99",
  storageBucket: "projects-39a99.firebasestorage.app",
  messagingSenderId: "1024432063590",
  appId: "1:1024432063590:web:fc3a2fd87c9169267699a7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);