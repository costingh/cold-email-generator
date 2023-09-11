export interface SegmentInterface {
	id: number;
    name: string;
    description?: string;
    user_email: string;
    industry?: string;
    location?: string;
    jobTitle?: string;
    interests: string[];
}
