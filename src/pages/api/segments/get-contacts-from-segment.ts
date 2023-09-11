import { prisma } from "@lib/prisma";


export default async function contacts(req: any , res: any) {
	if (prisma) {
		if (req.method === "GET") {
			try {
				const industry = req.query.industry || '';
				const location = req.query.location || '';
				const jobTitle = req.query.jobTitle || '';
				const biography = req.query.biography || '';
				const education = req.query.education || '';
				const interests = req.query.interests || '';

                const contacts = await prisma.contact.findMany({
                    where: {
                        job_title: { contains: jobTitle },
                        // industry: { contains: industry },
                        location: { contains: location },
                        biography: { contains: biography },
                        education: { contains: education },
                        interests: { hasEvery: interests }
                    },
                });
				res.send({
					contacts: contacts,
					error: null,
					status: 201
				});
			} catch (error : any) {
				res.send({
					error: error.message,
					contacts: [],
					status: 500
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
