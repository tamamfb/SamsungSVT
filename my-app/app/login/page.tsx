// app/login/page.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, Goal } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      toast.success('Login Berhasil!', {
        description: 'Selamat datang kembali!',
      });
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err: any) {
      toast.error('Login Gagal', { description: err.message });
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen football-theme-bg">
      <Card className="w-full max-w-sm mx-4 bg-black/50 text-white border-gray-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-600 rounded-full p-3 w-fit mb-4">
            <Goal className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Kick Off!</CardTitle>
          <CardDescription className="text-gray-300">
            Masuk untuk memulai sesi monitoring Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required 
                className="bg-gray-800/50 border-gray-600 text-white focus:ring-green-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required 
                  className="bg-gray-800/50 border-gray-600 text-white focus:ring-green-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'LOGIN'}
            </Button>
            <div className="mt-4 text-center text-sm text-gray-300">
              Belum punya akun?{' '}
              <Link href="/register" className="underline font-semibold hover:text-green-400">
                Daftar di sini
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}