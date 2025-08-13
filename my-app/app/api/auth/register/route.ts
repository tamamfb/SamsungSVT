// app/api/auth/register/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validasi
    if (!username || !password) {
      return new NextResponse('Username dan password harus diisi', { status: 400 });
    }
    if (password.length < 6) {
        return new NextResponse('Password minimal harus 6 karakter', { status: 400 });
    }

    // Cek duplikasi username
    const existingUser = await prisma.users.findUnique({
      where: { username },
    });
    if (existingUser) {
      return new NextResponse('Username sudah digunakan', { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    await prisma.users.create({
      data: {
        username,
        password_hash: hashedPassword,
      },
    });

    return new NextResponse('Akun berhasil dibuat', { status: 201 });

  } catch (error) {
    console.error('[REGISTER_API_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}