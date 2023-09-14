import { prisma } from "@lib/prisma";
import {publishContact} from '../../../../rabbitmq/publisher';

export default async function queue(req: any, res: any) {
    try {
        publishContact({ceva:'ok'})

        res.send({
            error: null,
            response: 'Contact queued',
            status: 200,
        });
    } catch (error : any) {
        res.send({
            error: error.message,
            status: 500,
        });
    }
}
