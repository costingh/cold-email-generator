export interface CampaignInterface {
    id: string; 
    name: string; 
    description: string; 
    status: CampaignStatus; 
    segments: string[]; 
    templateId: string;
    schedule: CampaignSchedule;
    createdAt: Date;
}

export enum CampaignStatus {
    DRAFT = 'Draft',
    ACTIVE = 'Active',
    PAUSED = 'Paused',
    COMPLETED = 'Completed'
}

export interface CampaignSchedule {
    type: ScheduleType;
    startDate: Date; 
}

export enum ScheduleType {
    IMMEDIATE = 'Immediate',
    DAILY = 'Daily',
    WEEKLY = 'Weekly',
    CUSTOM = 'Custom'
}