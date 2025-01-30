import { PrismaClient } from '@prisma/client'

export  const prismadb = new PrismaClient()
// use `prisma` in your application to read and write data in your DB