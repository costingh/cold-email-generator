import { SegmentInterface } from '@interfaces/Segment.interface'

export interface ContactInterface {
	id: number;
	email: string;
	name: string;
	phoneNumber?: string;
	company?: string;
	job_title?: string;
	biography?: string;
	education?: string;
	location?: string;
	user_email: string;
	segments?: SegmentInterface[];
	createdAt: Date;
	updatedAt: Date;
}