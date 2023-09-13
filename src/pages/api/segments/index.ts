import { prisma } from "@lib/prisma";
import { SegmentInterface } from "@interfaces/Segment.interface";

export default async function handler(req: any, res: any) {
    if (prisma) {
        if (req.method === "GET") {
            let segmentsCount = 0;
            try {
                const userEmail = req.query.userEmail || '';
                const segmentId = req.query.segmentId || '';
                const count = req.query.count;

                let segments = null; 
                
                if(userEmail && !count) {
                    segments = await prisma.segment.findMany({
                        where: {
                            user_email: { contains: userEmail },
                        },
                    });
                } else if(segmentId && !count) {
                    segments = await prisma.segment.findFirst({
                        where: {
                            id: { equals: segmentId },
                        },
                    });
                } else if(segmentId && count) {
                    const industry = req.query.industry || '';
                    const location = req.query.location || '';
                    const jobTitle = req.query.jobTitle || '';
                    const biography = req.query.biography || '';
                    const education = req.query.education || '';
                    const interests = decodeURIComponent(req.query.interests).split('+') || [];

                    segmentsCount = await prisma.contact.count({
                        where: {
                            job_title: { contains: jobTitle },
                            // industry: { contains: industry },
                            location: { contains: location },
                            biography: { contains: biography },
                            education: { contains: education },
                            interests: { hasEvery: interests }
                        },
                    });
                } else {
                    segments = await prisma.segment.findMany();
                }

                res.send({
                    segments: segments,
                    error: null,
                    status: 201
                });
            } catch (error: any) {
                res.send({
                    error: error.message,
                    segments: [],
                    count: segmentsCount,
                    status: 500
                });
            }
        } else if (req.method === "POST") {
            try {
                const segment = req.body.segment;

                const segmentResponse = await prisma.segment.create({
                    data: segment,
                });

                res.send({
                    error: null,
                    response: segmentResponse,
                    status: 201,
                });
            } catch (error : any) {
                res.send({
                    error: error.message,
                    status: 500,
                });
            }
        } else {
            res.send({
                error: "Method not supported",
                status: 405,
            });
        }
    } else {
        res.send({
            error: "Prisma client could not be initiated",
            status: 500,
            response: null,
        });
    }
}
