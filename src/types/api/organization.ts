// src/interfaces/api/organization.ts

export interface OrganizationRequest {
    name: string;
    description: string;
    adminId: string; // UID of the admin
}

export interface OrganizationResponse {
    id: string;
    name: string;
    description: string;
    adminId: string;
    collaborators?: string[]; // UIDs of collaborators
    metadata: Metadata;
}

export interface Metadata {
    createdAt: Date;
    updatedAt: Date;
}
