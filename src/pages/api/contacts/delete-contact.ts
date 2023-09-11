import { prisma } from "@lib/prisma";

export default async function handler(req: any, res: any) {
    if (prisma) {
        if (req.method === "DELETE") {
            try {
                const contactId = req.query.contactId;

                if (!contactId) {
                    res.send({
                        error: "Missing contactId parameter",
                        status: 400,
                    });
                    return;
                }

                await prisma.contact.delete({
                    where: {
                        id: parseInt(contactId),
                    },
                });

                res.end();
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
