// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2PEgx96cAAUCNpBdyTLBSwxrWx0_uO_8",
  authDomain: "profile-assignment-e7a91.firebaseapp.com",
  projectId: "profile-assignment-e7a91",
  storageBucket: "profile-assignment-e7a91.appspot.com",
  messagingSenderId: "601681512724",
  appId: "1:601681512724:web:9ed7c9db769af2b9d81a01",
  measurementId: "G-0CGV3QR41S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export default app;
