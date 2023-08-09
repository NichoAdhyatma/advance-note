import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBn6r1tLRsl5LEd_swLiNhA8z-lhtTT6g0",
  authDomain: "note-app-6e191.firebaseapp.com",
  projectId: "note-app-6e191",
  storageBucket: "note-app-6e191.appspot.com",
  messagingSenderId: "581268276550",
  appId: "1:581268276550:web:859bd702875930d70a9147",
  measurementId: "G-3Z9J0LCKCX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();


