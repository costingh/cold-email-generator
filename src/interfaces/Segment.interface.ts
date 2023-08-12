export interface SegmentInterface {
    id: string; // Unique identifier for the segment
    name: string; // Name of the segment
    description: string; // Description of the segment (optional)
    criteria: SegmentCriteria; // Criteria for segmenting contacts
}

export interface SegmentCriteria {
    industry?: string; // Industry criterion (e.g., "Technology", "Healthcare")
    location?: string; // Location criterion (e.g., "United States", "Europe")
    jobTitle?: string; // Job title criterion (e.g., "CEO", "Software Engineer")
    engagementLevel?: EngagementLevel; // Engagement level criterion
    interests?: string[]; // Interests criterion
    // Add more criteria as needed...
}

export enum EngagementLevel {
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low'
}
