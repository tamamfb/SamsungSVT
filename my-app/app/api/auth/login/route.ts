// app/api/auth/login/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return new NextResponse('Username dan password harus diisi', { status: 400 });
    }

    // Cari user
    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return new NextResponse('Username atau password salah', { status: 401 });
    }

    // Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        return new NextResponse('Username atau password salah', { status: 401 });
    }

    // Buat Token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Set cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 jam
      path: '/',
    });

    return NextResponse.json({ message: 'Login berhasil' });

  } catch (error) {
    console.error('[LOGIN_API_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}