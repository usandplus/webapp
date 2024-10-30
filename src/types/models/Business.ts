// src/interfaces/models/Business.ts

export interface BusinessModel {
    id: string;
    name: string;
    category: string;
    description: string;
    adminId: string; // UID of the admin
    collaborators?: string[]; // UIDs of collaborators
    createdAt: Date;
    updatedAt: Date;
}
