import { prisma } from "@lib/prisma";

export default async function handler(req: any, res: any) {
    if (prisma) {
        if (req.method === "DELETE") {
            try {
                const segmentId = req.query.segmentId;

                if (!segmentId) {
                    res.send({
                        error: "Missing segmentId parameter",
                        status: 400,
                    });
                    return;
                }

                const deleteSegment = await prisma.segment.delete({
                    where: {
                        id: parseInt(segmentId),
                    },
                });

                res.send({
                    error: null,
                    response: 'Segment successfully deleted',
                    status: 200,
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
        });
    }
}
