import { prisma } from "@lib/prisma";


export default async function contacts(req: { method: string; body: { contact: any; }; }, res: { send: (arg0: { contacts?: any; error: any; response?: any; message?: string; status?: number; }) => void; }) {
	if (prisma) {
		if (req.method === "GET") {
			try {
				const contacts = await prisma.contact.findMany();
				res.send({
					contacts: contacts,
					error: null,
				});
			} catch (error : any) {
				res.send({
					error: error.message,
					contacts: [],
				});
			}
		} else if (req.method === "POST") {
			try {
				let contact = req.body.contact;

				const existsContact = await prisma.contact.findUnique({
					where: {
						email: contact.email,
					},
				})

				if(existsContact) {
					res.send({
						error: null,
						response: existsContact,
						message: 'Contact already exists in DB, so we are not saving it again',
						status: 201,
					});
				} else {
					const userResponse = await prisma.contact.create({
						data: contact,
					});
	
					res.send({
						error: null,
						response: userResponse,
						status: 201,
					});
				}
			} catch (error : any) {
				if (error.code === "P2002") {
					res.send({
						error: "Contact with email already exists",
						status: 409,
					});
				} else {
					res.send({
						error: error.message,
						status: 500,
					});
				}
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
