import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth';
import { addDocument, getDocumentById } from '../firestore/firestoreService';
import { UNPBasePrivateUser, UNPBasePublicUser, UNPBaseUser } from '../../types/models/common';

export const createUserDocuments = async (user: User): Promise<UNPBaseUser> => {
  const userBaseData: UNPBaseUser = {
    displayName: user.displayName || '',
    email: user.email || '',
    lastSignInTime: user.metadata.lastSignInTime!,
    photoURL: user.photoURL || '',
    userId: user.uid,
    role: 'user',
  };

  const userPublicData: UNPBasePublicUser = {
    displayName: user.displayName || '',
    description: '',
    history: '',
    logo: user.photoURL || '',
    aboutUs: '',
    services: [],
    importantPeople: [],
    events: [],
    categories: '',
    visibility: {}
  };

  const userPrivateData: UNPBasePrivateUser = {
    email: user.email || '',
    emailVerified: user.emailVerified,
    locationAddress: '',
    locationCity: '',
    locationCountry: '',
    locationZipcode: '',
    creationTime: user.metadata.creationTime!,
    phoneNumber: user.phoneNumber || null,
  };

  // Create base user doc
  await addDocument(`users`, userBaseData, user.uid);
  // Create public info doc
  await addDocument(`users/${user.uid}/public/`, userPublicData, 'info');
  // Create private info doc
  await addDocument(`users/${user.uid}/private/`, userPrivateData, 'info');
  return userBaseData
};

export const signUpWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // If this is a new user, create the user docs
  const existingUserDoc = await getDocumentById(`users`, user.uid);
  if (!existingUserDoc) {
    await createUserDocuments(user);
  }

  // Return control back to AuthProvider's onAuthStateChanged to handle state
  return userCredential.user;
};

export const signInWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  // AuthProvider will handle the state changes
  return userCredential.user;
};

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, googleProvider);
  // const user = result.user;

  // // If this is a new user, create the user docs
  // const existingUserDoc = await getDocumentById(`users`, user.uid);
  // if (!existingUserDoc) {
  //   console.log('No user doc found. Creating...');
  //   try {
  //     await createUserDocuments(user);
  //   } catch (e: any) {
  //     console.error('Error creating user document', e);
  //   }
  // }

  // AuthProvider will handle the state changes now
};

export const signOutUser = async () => {
  await signOut(auth);
};
