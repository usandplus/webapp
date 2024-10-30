// src/interfaces/api/campaign.ts

export interface CampaignRequest {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    organizationId: string; // Related organization ID
}

export interface CampaignResponse {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    organizationId: string;
}
