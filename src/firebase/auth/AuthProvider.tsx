import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, firestore } from '../firebaseConfig';
import { getDocumentById } from '../firestore/firestoreService';
import { UNPUser, UserEntityMembership } from '../../types/models/User';
import { collection, getDocs, query } from 'firebase/firestore';
import { createUserDocuments } from './authService';
import { UNPBaseUser } from '../../types/models/common';
import { Spinner } from 'react-bootstrap';
import UNPSpinner from '../../Components/unp/UNPSpinner';

interface AuthContextType {
  user: UNPBaseUser | null;
  loading: boolean;
  userMemberships: UserEntityMembership[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UNPBaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userMemberships, setUserMemberships] = useState<UserEntityMembership[]>([]);

  const fetchUserMemberships = async (userId: string): Promise<UserEntityMembership[]> => {
    try {
      const adminMembershipsRef = collection(firestore, `users/${userId}/private/memberships/admin`);
      const userMembershipsRef = collection(firestore, `users/${userId}/private/memberships/user`);

      const [adminSnapshot, userSnapshot] = await Promise.all([
        getDocs(query(adminMembershipsRef)),
        getDocs(query(userMembershipsRef)),
      ]);

      const adminMemberships = adminSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          entityDisplayName: data.entityDisplayName || "",
          role: data.role || "",
          entityId: data.entityId || "",
          entityType: data.entityType || "",
        };
      });

      const basicMemberships = userSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          entityDisplayName: data.entityDisplayName || "",
          role: data.role || "",
          entityId: data.entityId || "",
          entityType: data.entityType || "",
        };
      });

      return [...adminMemberships, ...basicMemberships];
    } catch (error) {
      console.error("Error fetching user memberships:", error);
      return [];
    }
  };

  const fetchUNPUser = async (user: User): Promise<UNPBaseUser | null> => {
    try {
      let userDoc = await getDocumentById(`users`, user.uid);
      if (userDoc) {
        return userDoc as UNPBaseUser;
      } else {
        console.log('no user document, creating...')
        userDoc  = await createUserDocuments(user)
      }
      
      return userDoc as UNPBaseUser;
    } catch (error) {
      console.error('Error fetching user document:', error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const unpUser = await fetchUNPUser(firebaseUser);
        setUser(unpUser);

        if (unpUser) {
          const memberships = await fetchUserMemberships(firebaseUser.uid);
          setUserMemberships(memberships);
        } else {
          setUserMemberships([]);
        }
      } else {
        setUser(null);
        setUserMemberships([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, loading, userMemberships }), [user, loading, userMemberships]);

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
