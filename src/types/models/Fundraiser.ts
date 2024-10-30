// src/interfaces/models/Fundraiser.ts

export interface FundraiserModel {
    id: string;
    title: string;
    goalAmount: number;
    currentAmount: number; // Amount raised so far
    description: string;
    organizationId: string; // Related organization ID
    createdAt: Date;
    updatedAt: Date;
}
