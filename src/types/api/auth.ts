// src/interfaces/api/auth.ts

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    role: string; // e.g., 'admin', 'user', 'org'
}

export interface UserResponse {
    uid: string;
    email: string;
    role: string;
    metadata: UserMetadata;
}

export interface UserMetadata {
    createdAt: Date;
    updatedAt: Date;
}
