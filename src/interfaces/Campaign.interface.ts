export interface CampaignInterface {
    id: string; // Unique identifier for the campaign
    name: string; // Name of the campaign
    description: string; // Description of the campaign
    status: CampaignStatus; // Status of the campaign (Draft, Active, Paused, Completed, etc.)
    segments: string[]; // Array of segment IDs associated with the campaign
    templateId: string; // ID of the email template used in the campaign
    schedule: CampaignSchedule; // Schedule for sending emails
    createdAt: Date; // Timestamp when the campaign was created
}

export enum CampaignStatus {
    DRAFT = 'Draft',
    ACTIVE = 'Active',
    PAUSED = 'Paused',
    COMPLETED = 'Completed'
}

export interface CampaignSchedule {
    type: ScheduleType; // Type of schedule (Immediate, Daily, Weekly, Custom, etc.)
    startDate: Date; // Start date and time of the campaign
    recurring?: RecurringOptions; // Recurring options if applicable (optional)
}

export enum ScheduleType {
    IMMEDIATE = 'Immediate',
    DAILY = 'Daily',
    WEEKLY = 'Weekly',
    CUSTOM = 'Custom'
}

export interface RecurringOptions {
    frequency: RecurringFrequency; // Frequency of recurrence (Daily, Weekly, Monthly, etc.)
    interval: number; // Interval between recurrences (e.g., every 2 weeks)
}

export enum RecurringFrequency {
    DAILY = 'Daily',
    WEEKLY = 'Weekly',
    MONTHLY = 'Monthly',
    // Add more options as needed...
}
