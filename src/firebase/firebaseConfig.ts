// src/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB3JaxoH0B_fSUK7X7MnNNB-lbn3oRklOU",
  authDomain: "usandplus-37b97.firebaseapp.com",
  databaseURL: "https://usandplus-37b97-default-rtdb.firebaseio.com",
  projectId: "usandplus-37b97",
  storageBucket: "usandplus-37b97.firebasestorage.app",
  messagingSenderId: "886067048447",
  appId: "1:886067048447:web:1f39eafc1987e3ab4dc1ca",
  measurementId: "G-XTP7HNYTFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);


