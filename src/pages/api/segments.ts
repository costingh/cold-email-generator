import { prisma } from "@lib/prisma";
import { SegmentInterface } from "@interfaces/Segment.interface";

export default async function handler(req: { method: string; query: { userEmail: string, segmentId: any, count: boolean }; body: { segment: any; }; }, res: { send: (arg0: { segments?: any | never[]; count? : number | 0; error: any; response?: any; status?: number; }) => void; }) {
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
                    segmentsCount = await prisma.contactSegment.count({
                        where: {
                            segmentId: { equals: segmentId },
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
