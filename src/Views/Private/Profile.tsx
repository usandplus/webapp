// Example usage in a ProfileView component

import React from 'react';
import { useAuth } from '../../firebase/contexts/AuthContext';

const ProfileView: React.FC = () => {
    const { user, role, logout } = useAuth();

    if (!user) {
        return <p>Loading...</p>; // Optionally handle loading state
    }

    return (
        <div>
            <h1>Welcome, {user.displayName || user.email}</h1>
            <p>Your Role: {role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default ProfileView;
