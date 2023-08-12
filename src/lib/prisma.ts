import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };


const prismaDb = globalForPrisma.prisma ? globalForPrisma.prisma : (typeof window === "undefined") ? new PrismaClient({
    log: ["query"],
  }) : null;
  
export const prisma = prismaDb;

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;
