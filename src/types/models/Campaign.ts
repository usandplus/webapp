// src/interfaces/models/Campaign.ts

export interface CampaignModel {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    organizationId: string; // Related organization ID
    createdAt: Date;
    updatedAt: Date;
}
