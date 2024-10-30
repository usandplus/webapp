// src/firebase/auth/AuthContext.tsx

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getUserRole } from '../auth/roleService';

interface AuthContextProps {
    user: FirebaseUser | null;  // Importing User type from firebase/auth
    role: string | null;
    logout: () => Promise<void>; // Adding logout method
}

// Create context with undefined as the default value
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [role, setRole] = useState<string | null>(null);

    // Effect to handle authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userRole = await getUserRole(currentUser.uid);
                setRole(userRole);
            } else {
                setRole(null); // Reset role if user is null
            }
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    // Logout function
    const logout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            setRole(null); // Reset role on logout
        } catch (error) {
            console.error("Error during logout: ", error);
            // Handle the error as needed
        }
    };

    return (
        <AuthContext.Provider value={{ user, role, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext easily
export const useAuth = (): AuthContextProps => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
