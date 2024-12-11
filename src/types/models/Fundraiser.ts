// src/interfaces/models/Fundraiser.ts

export interface FundraiserModel {
    id: string;
    title: string;
    goalAmount: number;
    currentAmount: number; // Amount raised so far
    description: string;
    FundacionId: string; // Related fundacion ID
    createdAt: Date;
    updatedAt: Date;
}
