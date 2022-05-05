import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query'],
});

prisma.$on('beforeExit', () => console.log('Database disconnected'));

export const connect = async (): Promise<void> => await prisma.$connect();

export const disconnect = async (): Promise<void> => await prisma.$disconnect();
