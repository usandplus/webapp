// Example usage in a ProfileView component

import React from 'react';
import { useAuth } from '../../firebase/contexts/AuthContext';
import UNPButton from '../../Components/unp/UNPButton';

const ProfileView: React.FC = () => {
    const { user, role, logout } = useAuth();

    if (!user) {
        return <p>Loading...</p>; // Optionally handle loading state
    }

    return (
        <div>
            <h1>Welcome, {user.displayName || user.email}</h1>
            <p>Your Role: {role}</p>
            <UNPButton onClick={logout}>Logout</UNPButton>
        </div>
    );
};

export default ProfileView;
