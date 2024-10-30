// src/interfaces/models/Organization.ts

export interface OrganizationModel {
    id: string;
    name: string;
    description: string;
    adminId: string; // UID of the admin
    collaborators?: string[]; // UIDs of collaborators
    createdAt: Date;
    updatedAt: Date;
}
