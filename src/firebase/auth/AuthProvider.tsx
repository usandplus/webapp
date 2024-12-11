import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { getAllDocuments, getDocumentById } from '../firestore/firestoreService'; // Function to fetch user from Firestore
import { UNPUser, UserEntityMembership } from '../../types/models/User';
import { collection, getDocs } from 'firebase/firestore';
import { EntityService } from '../services/entityService';

interface AuthContextType {
  user: UNPUser | null;
  loading: boolean;
  userMemberships: UserEntityMembership[] | null | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UNPUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userMemberships, setUserMemberships] = useState<UserEntityMembership[] | null | undefined>([])

  const fetchUNPUser = async (uid: string): Promise<UNPUser | null> => {
    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const userDoc = await getDocumentById(`users/${uid}/public`, 'info');
        if (userDoc) {
          return userDoc as UNPUser;
        }
        console.log('User document not found, retrying...');
      } catch (error) {
        console.error('Error fetching user document:', error);
      }
      retries++;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }

    console.error('User document could not be fetched after multiple attempts.');
    return null;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('initializeauth')
      setLoading(true);
      try {
        const result = await getRedirectResult(auth); // Handle redirect-based logins
        if (result?.user) {
          const firebaseUser = result.user;
          const unpUser = await fetchUNPUser(firebaseUser.uid);
          setUser(unpUser);
          
          const memberships = await EntityService.getAllUserMemberships(firebaseUser.uid);
          if(memberships) setUserMemberships(memberships);
        }
      } catch (error) {
        console.error('Error during redirect result handling:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const unpUser = await fetchUNPUser(firebaseUser.uid);
        setUser(unpUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ user, loading, userMemberships }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
