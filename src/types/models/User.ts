// src/interfaces/models/User.ts

export interface UserModel {
    uid: string;
    email: string;
    role: string; // Can be 'admin', 'org', etc.
    createdAt: Date;
    updatedAt: Date;
}
