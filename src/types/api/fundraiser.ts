// src/interfaces/api/fundraiser.ts

export interface FundraiserRequest {
    title: string;
    goalAmount: number; // Target amount to raise
    description: string;
    FundacionId: string; // Related fundacion ID
}

export interface FundraiserResponse {
    id: string;
    title: string;
    goalAmount: number;
    description: string;
    FundacionId: string;
    currentAmount: number; // Amount raised so far
}
