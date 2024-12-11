// src/interfaces/models/Campaign.ts

export interface CampaignModel {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    FundacionId: string; // Related fundacion ID
    createdAt: Date;
    updatedAt: Date;
}
