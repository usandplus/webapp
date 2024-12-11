// src/firebase/auth/roleService.ts

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { Role } from '../../types/models/User';

// Function to get user role from Firestore
export const getUserRole = async (userId: string): Promise<string | null> => {
    const userDocRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? (userDoc.data()?.role as string) : null;
};

// Function to assign a role to a user
export const assignRole = async (userId: string, role: Role) => {
    const userDocRef = doc(firestore, 'users', userId);
    await setDoc(userDocRef, { role }, { merge: true });
};
