// src/interfaces/api/fundacion.ts

export interface FundacionRequest {
    name: string;
    description: string;
    adminId: string; // UID of the admin
}

export interface FundacionResponse {
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
