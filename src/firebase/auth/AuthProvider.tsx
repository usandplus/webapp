import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { getAllDocuments, getDocumentById } from '../firestore/firestoreService'; // Function to fetch user from Firestore
import { UNPUser, UserEntityMembership } from '../../types/models/User';
import { collection, getDocs, query } from 'firebase/firestore';
import { EntityService } from '../services/entityService';

interface AuthContextType {
  user: UNPUser | null;
  loading: boolean;
  userMemberships: UserEntityMembership[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UNPUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userMemberships, setUserMemberships] = useState<UserEntityMembership[]>([])

  const getAllUserMemberships=async (userId: string): Promise<UserEntityMembership[]> =>{
    try {
  
      // Paths for both collections
      const adminMembershipsCollection = collection(
        firestore,
        `users/${userId}/private/memberships/admin`
      );
      const userMembershipsCollection = collection(
        firestore,
        `users/${userId}/private/memberships/user`
      );
  
      // Queries for both collections
      const adminMembershipsQuery = query(adminMembershipsCollection);
      const userMembershipsQuery = query(userMembershipsCollection);
  
      // Fetch documents from both collections concurrently
      const [adminSnapshot, userSnapshot] = await Promise.all([
        getDocs(adminMembershipsQuery),
        getDocs(userMembershipsQuery),
      ]);
  
  
      // Map over the snapshots to construct arrays of documents
      const adminMemberships: UserEntityMembership[] = adminSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          entityDisplayName: data.entityDisplayName || "",
          role: data.role || "",
          entityId: data.entityId || "",
          entityType: data.entityType || "",
        };
      });
  
      const userMemberships: UserEntityMembership[] = userSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          entityDisplayName: data.entityDisplayName || "",
          role: data.role || "",
          entityId: data.entityId || "",
          entityType: data.entityType || "",
        };
      });
  
      // Merge the results from both collections
      const allMemberships = [...adminMemberships, ...userMemberships];
      console.log(allMemberships)
      return allMemberships;
    } catch (error) {
      console.error("Error fetching user memberships:", error);
      throw error; // Rethrow the error for upstream handling
    }
  }
  const fetchUNPUser = async (uid: string): Promise<UNPUser | null> => {
    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const userDoc = await getDocumentById(`users`, uid);
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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const unpUser = await fetchUNPUser(firebaseUser.uid);
        setUser(unpUser);
        const memberships = await getAllUserMemberships(firebaseUser.uid);
        console.log(memberships)
        setUserMemberships(memberships);
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
