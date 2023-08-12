import { prisma } from "../../lib/prisma";

export default async function handler(req: { method: string; body: { campaign: any; }; }, res: { send: (arg0: { campaigns?: any; error: any; response?: any; status?: number; }) => void; }) {
    if (prisma) {
        if (req.method === "GET") {
            try {
                const campaigns = await prisma.campaign.findMany();
                res.send({
                    campaigns: campaigns,
                    error: null,
                });
            } catch (error : any) {
                res.send({
                    error: error.message,
                    campaigns: [],
                });
            }
        } else if (req.method === "POST") {
            try {
                const campaign = req.body.campaign;

                const campaignResponse = await prisma.campaign.create({
                    data: campaign,
                });

                res.send({
                    error: null,
                    response: campaignResponse,
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
