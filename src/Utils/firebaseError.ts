// src/utils/firebaseErrors.ts
import { FirebaseError } from 'firebase/app';

export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Incorrect password, please try again.';
    case 'auth/user-not-found':
      return 'User not found with this email.';
    case 'auth/email-already-in-use':
      return 'This email is already associated with an account.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
