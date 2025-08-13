// app/dashboard/page.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tv, VideoOff, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CustomThemeToggle } from '@/components/custom-theme-toggle';

// Tipe data untuk setiap pemain (untuk simulasi)
type PlayerStatus = {
  id: number;
  name: string;
  podStatus: 'CONNECTED' | 'NO INPUT' | 'CRASHED';
  isInjured: boolean;
  hasViolation: boolean;
  videoUrl?: string;
};

// Data simulasi untuk 11 pemain
const mockPlayerData: PlayerStatus[] = [
    { id: 1, name: 'PLAYER - 1', podStatus: 'CONNECTED', isInjured: false, hasViolation: false, videoUrl: 'https://example.com/video1.mp4' },
    { id: 2, name: 'PLAYER - 2', podStatus: 'CRASHED', isInjured: true, hasViolation: false, videoUrl: 'https://example.com/video2.mp4' },
    { id: 3, name: 'PLAYER - 3', podStatus: 'CONNECTED', isInjured: false, hasViolation: false, videoUrl: 'https://example.com/video3.mp4' },
    { id: 4, name: 'PLAYER - 4', podStatus: 'NO INPUT', isInjured: false, hasViolation: false },
    { id: 5, name: 'PLAYER - 5', podStatus: 'CONNECTED', isInjured: false, hasViolation: true, videoUrl: 'https://example.com/video5.mp4' },
    { id: 6, name: 'PLAYER - 6', podStatus: 'CONNECTED', isInjured: false, hasViolation: false, videoUrl: 'https://example.com/video6.mp4' },
    { id: 7, name: 'PLAYER - 7', podStatus: 'CONNECTED', isInjured: false, hasViolation: false, videoUrl: 'https://example.com/video7.mp4' },
    { id: 8, name: 'PLAYER - 8', podStatus: 'CONNECTED', isInjured: false, hasViolation: false, videoUrl: 'https://example.com/video8.mp4' },
    { id: 9, name: 'PLAYER - 9', podStatus: 'CONNECTED', isInjured: false, hasViolation: false, videoUrl: 'https://example.com/video9.mp4' },
    { id: 10, name: 'PLAYER - 10', podStatus: 'CONNECTED', isInjured: false, hasViolation: false, videoUrl: 'https://example.com/video10.mp4' },
    { id: 11, name: 'PLAYER - 11', podStatus: 'CONNECTED', isInjured: false, hasViolation: false, videoUrl: 'https://example.com/video11.mp4' },
];


export default function DashboardPage() {
  const [selectedPlayerId, setSelectedPlayerId] = React.useState(1);

  const selectedPlayerData = mockPlayerData.find(p => p.id === selectedPlayerId);

  const getStatusColor = (status: PlayerStatus['podStatus']) => {
    switch (status) {
      case 'CONNECTED': return 'text-green-500';
      case 'NO INPUT': return 'text-orange-500';
      case 'CRASHED': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    // Latar belakang diubah untuk dark mode menjadi hitam pekat
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 font-sans transition-colors duration-300">
      {/* Header disesuaikan dengan latar belakang hitam */}
      <header className="flex justify-between items-center py-3 px-8 border-b border-gray-200 dark:border-neutral-800 transition-colors duration-300">
        <h1 className="text-xl font-bold tracking-wider uppercase text-gray-800 dark:text-white">AISAVINS</h1>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-base font-semibold text-blue-600 dark:text-green-500">LIVE CAM</Link>
          <Link href="/crash-record" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">CRASH RECORD</Link>
          <CustomThemeToggle />
        </nav>
      </header>

      <main className="p-8">
        <div className="mb-8">
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={12}
            freeMode={true}
            className="player-swiper"
          >
            {mockPlayerData.map(player => (
              <SwiperSlide key={player.id} style={{ width: 'auto' }}>
                <Button
                  onClick={() => setSelectedPlayerId(player.id)}
                  variant="ghost"
                  className={`
                    rounded-lg px-5 py-2 text-sm transition-colors duration-300 hover:cursor-pointer
                    ${selectedPlayerId === player.id 
                      // Gaya tombol aktif diubah
                      ? 'bg-blue-600 text-white dark:bg-green-600' 
                      // Gaya tombol non-aktif diubah untuk dark mode
                      : 'bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700'}
                  `}
                >
                  {player.name}
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {selectedPlayerData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Kontainer video diubah untuk dark mode */}
            <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-xl p-4 sm:p-6 shadow-md dark:shadow-none border border-gray-100 dark:border-neutral-800 transition-colors duration-300">
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                {selectedPlayerData.podStatus !== 'NO INPUT' && selectedPlayerData.videoUrl ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center text-white">
                     <Tv size={48} className="text-green-500 mb-4"/>
                    <p className="text-xl font-bold">LIVE FEED: {selectedPlayerData.name}</p>
                    <p className="text-gray-400 text-sm">Video player would be here</p>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <VideoOff size={48} className="text-orange-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold">NO CAMERA DETECTED</h2>
                    <p className="text-orange-500 text-sm">Pod Status: NO INPUT</p>
                  </div>
                )}
              </div>
            </div>

            {/* Kartu status diubah untuk dark mode */}
            <div className="flex flex-col gap-6">
              <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm dark:shadow-none rounded-xl p-4 transition-colors duration-300 flex flex-col flex-1 justify-center">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">POD STATUS</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className={`text-3xl font-bold ${getStatusColor(selectedPlayerData.podStatus)}`}>
                    {selectedPlayerData.podStatus}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm dark:shadow-none rounded-xl p-4 transition-colors duration-300 flex flex-col flex-1 justify-center">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">INJURED</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex items-center gap-3">
                  {selectedPlayerData.isInjured ? 
                    <ShieldAlert size={28} className="text-red-500"/> : 
                    <ShieldCheck size={28} className="text-green-500"/>
                  }
                  <p className={`text-3xl font-bold ${selectedPlayerData.isInjured ? 'text-red-500' : 'text-green-500'}`}>
                    {selectedPlayerData.isInjured ? 'YES' : 'NO'}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm dark:shadow-none rounded-xl p-4 transition-colors duration-300 flex flex-col flex-1 justify-center">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">VIOLATION</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex items-center gap-3">
                  {selectedPlayerData.hasViolation ? 
                    <AlertTriangle size={28} className="text-orange-500"/> : 
                    <ShieldCheck size={28} className="text-green-500"/>
                  }
                  <p className={`text-3xl font-bold ${selectedPlayerData.hasViolation ? 'text-orange-500' : 'text-green-500'}`}>
                    {selectedPlayerData.hasViolation ? 'YES' : 'NO'}
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>
        ) : (
          <p>Pilih pemain untuk melihat status.</p>
        )}
      </main>
    </div>
  );
}