// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// Deklarasikan variabel global untuk menyimpan instance Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Gunakan instance yang sudah ada atau buat yang baru
const prisma = global.prisma || new PrismaClient();

// Di lingkungan development, simpan instance di variabel global
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;