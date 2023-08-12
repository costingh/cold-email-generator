import { prisma } from "@lib/prisma";
import { SegmentInterface } from "@interfaces/Segment.interface";

export default async function handler(req: { method: string; body: { segment: any; }; }, res: { send: (arg0: { segments?: any | never[]; error: any; response?: any; status?: number; }) => void; }) {
    if (prisma) {
        if (req.method === "GET") {
            try {
                const segments = await prisma.segment.findMany();
                res.send({
                    segments: segments,
                    error: null,
                });
            } catch (error: any) {
                res.send({
                    error: error.message,
                    segments: [],
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
