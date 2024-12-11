// src/interfaces/components/Profile.ts

export interface ProfileProps {
    userId: string; // User's ID
    onEdit: () => void; // Function to edit profile
    data: UserProfileData; // User profile data
}

export interface UserProfileData {
    name: string;
    email: string;
    role: string;
    fundacion?: string; // Optional fundacion if applicable
}
