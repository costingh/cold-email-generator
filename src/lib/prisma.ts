// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };


// const prismaDb = globalForPrisma.prisma ? globalForPrisma.prisma : (typeof window === "undefined") ? new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'],
// }) : null;

// export const prisma = prismaDb;

// if (process.env.NODE_ENV != "production") globalForPrisma.prisma;


import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaDb: PrismaClient | null = null;

if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
  // This block runs in Node.js environment during development
  prismaDb = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
} else {
  // This block runs in the browser or in production
  prismaDb = globalForPrisma.prisma || null;
}

export const prisma = prismaDb;
