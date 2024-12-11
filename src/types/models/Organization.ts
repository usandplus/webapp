// src/interfaces/models/Fundacion.ts

export interface FundacionModel {
    id: string;
    name: string;
    description: string;
    adminId: string; // UID of the admin
    collaborators?: string[]; // UIDs of collaborators
    createdAt: Date;
    updatedAt: Date;
}
