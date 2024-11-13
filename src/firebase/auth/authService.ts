// src/firebase/auth/authService.ts

import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, User, signInWithRedirect, getRedirectResult, signInWithPopup } from 'firebase/auth';
import { assignRole } from './roleService';

// Sign up function with role assignment
export const signUpWithEmail = async (email: string, password: string, role: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await assignRole(userCredential.user.uid, role); // Assign role after user creation
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

// Sign in function
export const signInWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

// Sign in with Google
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async (): Promise<User | null> => {
    try {
        await signInWithPopup(auth, googleProvider);
        // After redirect, you'll retrieve the result using getRedirectResult()
        const result = await getRedirectResult(auth);
        
        if (result) {
            const user: User = result.user; // User information retrieved after the redirect
            
            // Additional logic can be added here, such as storing user info in Firestore

            return user; // Return the user object
        } else {
            console.error('No user returned after Google sign-in.');
            return null; // Handle case where no user is returned
        }
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        throw error; // Rethrow the error to handle it in the calling component
    }
};

// Sign out function
export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

// Other auth functions can be added here, e.g., password reset
