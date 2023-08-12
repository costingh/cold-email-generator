import { prisma } from "@lib/prisma";


export default async function handler(req: { method: string; body: { user: any; }; }, res: { send: (arg0: { users?: never[] | { id: number; email: string; name: string; providerId: string; uid: string; photoURL: string; phoneNumber: string; }[]; error: any; response?: { id: number; email: string; name: string; providerId: string; uid: string; photoURL: string; phoneNumber: string; } | null; message?: string; status?: number; }) => void; }) {
	
	console.log('#################################')
	if (prisma) {
		if (req.method === "GET") {
			try {
				const users = await prisma.user.findMany();
				res.send({
					users: users,
					error: null,
				});
			} catch (error : any) {
				res.send({
					error: error.message,
					users: [],
				});
			}
		} else if (req.method === "POST") {
			try {
				let user = req.body.user;

				const existsUser = await prisma.user.findUnique({
					where: {
						email: user.email,
					},
				})

				if(existsUser) {
					res.send({
						error: null,
						response: existsUser,
						message: 'User already exists in DB, so we are not saving it again',
						status: 201,
					});
				} else {
					const userResponse = await prisma.user.create({
						data: user
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
						error: "User with email already exists",
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
