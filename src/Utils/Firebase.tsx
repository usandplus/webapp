import React, { createContext, useContext, useState, useEffect } from "react"
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore, collection, addDoc, setDoc, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore"
import { getDatabase, ref, set, remove, get, update } from "firebase/database"
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signOut, User } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB3JaxoH0B_fSUK7X7MnNNB-lbn3oRklOU",
  authDomain: "usandplus-37b97.firebaseapp.com",
  databaseURL: "https://usandplus-37b97-default-rtdb.firebaseio.com",
  projectId: "usandplus-37b97",
  storageBucket: "usandplus-37b97.appspot.com",
  messagingSenderId: "886067048447",
  appId: "1:886067048447:web:1f39eafc1987e3ab4dc1ca",
  measurementId: "G-XTP7HNYTFZ"
  // apiKey: process.env.VITE_firebase_apiKey,
  // authDomain: process.env.VITE_firebase_authDomain,
  // databaseURL: process.env.VITE_firebase_databaseURL,
  // projectId: process.env.VITE_firebase_projectId,
  // storageBucket: process.env.VITE_firebase_storageBucket,
  // messagingSenderId: process.env.VITE_firebase_messagingSenderId,
  // appId: process.env.VITE_firebase_appId,
  // measurementId: process.env.VITE_firebase_measurementId
}

const app = (!getApps().length ? initializeApp(firebaseConfig) : getApp())
const firestore = getFirestore(app)
const database = getDatabase(app)
const auth = getAuth()
console.log('Firebase trigger: ', firestore, database, auth)

interface FirebaseContextProps {
  collection: any
  addDoc: any
  setDoc: any
  doc: any
  deleteDoc: any
  getDoc: any
  updateDoc: any
  ref: any
  set: any
  remove: any
  get: any
  update: any
  auth: any
  currentUser: any
  signInWithGoogle: any
  signOutFromGoogle: any
}

const FirebaseContext = createContext<FirebaseContextProps | null>(null)
interface FirebaseProviderProps {
  children: React.ReactNode
}

const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  
  const registerUserLogin = async (user: User | null) => {
    if (!user) return;
    try {
      const userRef = doc(firestore, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);
      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: new Date()
        });
        console.log('User registered in firestore:', user.uid);
      } else {
        await updateDoc(userRef, {
          lastLogin: new Date()
        });
        console.log('User last login updated in firestore:', user.uid);
      }
    } catch (error) {
      console.error('Error registering user login:', error);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      registerUserLogin(user);
    });
  }, [auth]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithRedirect(auth, provider)
      return result
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  const signOutFromGoogle = () => { return signOut(auth) }

  return (
    <FirebaseContext.Provider
      value={{
        collection, addDoc, setDoc, doc, deleteDoc, getDoc, updateDoc,
        ref, set, remove, get, update,
        auth, currentUser, signInWithGoogle, signOutFromGoogle
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

// Hook for child components to get the Firebase services
export const useFirebase = () => useContext(FirebaseContext)
export default FirebaseProvider