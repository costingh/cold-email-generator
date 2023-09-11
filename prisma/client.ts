import { Prisma, PrismaClient } from "@prisma/client";

declare global {
	namespace NodeJS {
		interface Global {
			prisma: PrismaClient;
		}
	}
}

let prisma: PrismaClient | null = null;

if (typeof window === "undefined") {
	if (process.env.NODE_ENV === "production") {
		prisma = new PrismaClient({
			log: ['query', 'info', 'warn', 'error'],
		});
	} else {
		if (!global.prisma) {
			global.prisma = new PrismaClient({
				log: ['query', 'info', 'warn', 'error'],
			});
		}
		prisma = global.prisma;
	}
} else {
	console.log(
		"Prisma Client cannot be initialized on the client-side. Connect to the database on the server-side."
	);
}

export default prisma;
