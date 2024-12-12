import { auth, firestore } from '../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth'
import { addDocument, getDocumentById } from '../firestore/firestoreService'
import { UNPUser, UserEntityMembership, UserEventMembership } from '../../types/models/User'
import { collection, getDocs, query } from 'firebase/firestore'
// Helper: Register new Google user
const registerGoogleUser = async (user: User) => {
  let userData: UNPUser = {
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
    creationTime: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    userId: user.uid,
    role: 'user',
  };
  await addDocument(`users/${user.uid}/public/`, userData, 'info');
  return userData;
};

export const setupInitialUserProfile = async (user: UNPUser) => {
  let userData = {
    published: false,
    heroImages: [], // Array of image URLs for the hero banner
    profileInfo: {
      name: user.displayName,
      description: '',
      aboutUs: '',
      services: [],
      location: '',
      logo: user.photoURL,
      ratingSummary: null,
      campaigns: [],
      importantPeople: []
    }
  }
  await addDocument(`users/${user.userId}/public/`, userData, 'profile')
  return userData
}

export const getUserData = async (uid: string) => {
    let userData = await getDocumentById('users', uid)
    return userData
}

// Sign up with email
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error signing up with email:', error)
    throw error
  }
}

// Sign in with email
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error signing in with email:', error)
    throw error
  }
}

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user doc exists
    let userDoc = await getDocumentById(`users/${user.uid}/public`, 'info');
    if (!userDoc) {
      console.log('No user doc found. Creating...');
      const userData = await registerGoogleUser(user);
      await setupInitialUserProfile(userData);
      userDoc = userData;
    }

    return userDoc;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};
// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}
