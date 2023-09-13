import { prisma } from "@lib/prisma";


export default async function contacts(req: any , res: any) {
	if (prisma) {
		if (req.method === "GET") {
			try {
				const userEmail = req.query.userEmail || '';
				const industry = req.query.industry || '';
				const location = (req.query.location && req.query.location.split(', ')) || null;
				const jobTitle = (req.query.jobTitle && req.query.jobTitle.split(', ')) || null;
				const biography = req.query.biography || '';
				const education = req.query.education || '';
				const interests = (req.query.interests && req.query.interests.split(', ')) || null;

				let query = {
                    where: {
                        user_email: { contains: userEmail },
                    }
                };

				if(jobTitle) (query.where as any).job_title = { in: jobTitle };
				if(location) (query.where as any).location = { in: location };
				if(interests) (query.where as any).interests = { in: interests };
				if(biography) (query.where as any).biography = { in: biography };
				if(education) (query.where as any).education = { in: education };

                const contacts = await prisma.contact.findMany(query);

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
