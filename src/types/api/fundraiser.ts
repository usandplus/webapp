// src/interfaces/api/fundraiser.ts

export interface FundraiserRequest {
    title: string;
    goalAmount: number; // Target amount to raise
    description: string;
    organizationId: string; // Related organization ID
}

export interface FundraiserResponse {
    id: string;
    title: string;
    goalAmount: number;
    description: string;
    organizationId: string;
    currentAmount: number; // Amount raised so far
}
