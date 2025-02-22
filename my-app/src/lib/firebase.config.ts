// lib/firebase.ts
"use client"
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

import dotenv from "dotenv";
dotenv.config(); // Manually load environment variables

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY, "API KEY");

const firebaseConfig = {
  // // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  // apiKey: "AIzaSyCAtJkO_oYSmJsSl17g7uZ84nyPa7lj37I",
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: "AIzaSyCAtJkO_oYSmJsSl17g7uZ84nyPa7lj37I",
  authDomain: "bazario-79ecc.firebaseapp.com",
  projectId: "bazario-79ecc",
  storageBucket: "bazario-79ecc.firebasestorage.app",
  messagingSenderId: "152291991640",
  appId: "1:152291991640:web:e8bfa7923f9f6f2d7bea2d",
  measurementId: "G-KFMQV7ML3W"
};
console.log(firebaseConfig,"firebaseConfig")
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 

export { provider, signInWithPopup, signOut, getAnalytics, auth, app };


