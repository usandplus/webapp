// src/interfaces/api/business.ts

export interface BusinessRequest {
    name: string;
    category: string; // e.g., 'Retail', 'Services'
    description: string;
    adminId: string; // UID of the admin
}

export interface BusinessResponse {
    id: string;
    name: string;
    category: string;
    description: string;
    adminId: string;
    collaborators?: string[]; // UIDs of collaborators
}
