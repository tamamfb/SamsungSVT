'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CustomThemeToggle } from '@/components/custom-theme-toggle';
import { Search } from 'lucide-react';

// Tipe data untuk setiap record
type CrashRecord = {
  id: number;
  playerName: string;
  podNumber: string;
  timestamp: string;
  aiInjured: boolean;
  actualInjured: boolean | null;
  aiViolation: boolean;
  actualViolation: boolean | null;
};

// Data simulasi (ganti dengan data dari API Anda)
const mockCrashData: CrashRecord[] = [
    { id: 1, playerName: 'Cristiano Ronaldo', podNumber: 'POD - 3', timestamp: '00:15:42', aiInjured: true, actualInjured: true, aiViolation: false, actualViolation: false },
    { id: 2, playerName: 'Ronaldinho', podNumber: 'POD - 1', timestamp: '00:17:10', aiInjured: false, actualInjured: null, aiViolation: false, actualViolation: false },
    { id: 3, playerName: 'Lionel Messi', podNumber: 'POD - 4', timestamp: '00:19:45', aiInjured: false, actualInjured: false, aiViolation: false, actualViolation: false },
    { id: 4, playerName: 'Kylian Mbappe', podNumber: 'POD - 5', timestamp: '00:20:42', aiInjured: true, actualInjured: false, aiViolation: false, actualViolation: null },
    { id: 5, playerName: 'Pele', podNumber: 'POD - 2', timestamp: '00:20:55', aiInjured: true, actualInjured: true, aiViolation: true, actualViolation: true },
    { id: 6, playerName: 'Osvaldo Haay', podNumber: 'POD - 1', timestamp: '00:23:22', aiInjured: true, actualInjured: false, aiViolation: true, actualViolation: true },
    { id: 7, playerName: 'Lamin Yamal', podNumber: 'POD - 3', timestamp: '00:24:24', aiInjured: false, actualInjured: false, aiViolation: false, actualViolation: false },
];

// Komponen kecil untuk status 'YES'/'NO' agar lebih rapi
const StatusBadge = ({ value }: { value: boolean }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-md ${value ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'}`}>
        {value ? 'YES' : 'NO'}
    </span>
);


export default function CrashRecordPage() {
    const [records, setRecords] = React.useState(mockCrashData);
    
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <header className="flex justify-between items-center py-3 px-8 border-b">
                <h1 className="text-xl font-bold tracking-wider uppercase">AISAVINS</h1>
                <nav className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-base text-muted-foreground hover:text-foreground">LIVE CAM</Link>
                    <Link href="/crash-record" className="text-base font-semibold text-primary">CRASH RECORD</Link>
                    <CustomThemeToggle />
                </nav>
            </header>

            <main className="p-8">
                <h2 className="text-3xl font-bold tracking-tight mb-6">Crash Record</h2>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-card border rounded-lg">
                    <div className="relative flex-grow min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input placeholder="Search player..." className="pl-10" />
                    </div>
                    <Select defaultValue="all"><SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="POD no." /></SelectTrigger><SelectContent><SelectItem value="all">POD no. ALL</SelectItem><SelectItem value="1">POD - 1</SelectItem></SelectContent></Select>
                    <Select defaultValue="all"><SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Injured" /></SelectTrigger><SelectContent><SelectItem value="all">Injured ALL</SelectItem><SelectItem value="yes">YES</SelectItem><SelectItem value="no">NO</SelectItem></SelectContent></Select>
                    <Select defaultValue="no"><SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Violation" /></SelectTrigger><SelectContent><SelectItem value="all">Violation ALL</SelectItem><SelectItem value="yes">YES</SelectItem><SelectItem value="no">NO</SelectItem></SelectContent></Select>
                    <Button>Export</Button>
                </div>

                {/* Data Table */}
                <div className="border rounded-lg overflow-hidden bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Player Name</TableHead>
                                <TableHead>POD Number</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Injured (AI)</TableHead>
                                <TableHead>Injured (Actual)</TableHead>
                                <TableHead>Violation (AI)</TableHead>
                                <TableHead>Violation (Actual)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">{record.playerName}</TableCell>
                                    <TableCell>{record.podNumber}</TableCell>
                                    <TableCell>{record.timestamp}</TableCell>
                                    <TableCell><StatusBadge value={record.aiInjured} /></TableCell>
                                    <TableCell>
                                        <Select defaultValue={record.actualInjured === null ? "null" : String(record.actualInjured)}>
                                            <SelectTrigger className="w-[80px] h-8 text-xs">
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="null">-</SelectItem>
                                                <SelectItem value="true">YES</SelectItem>
                                                <SelectItem value="false">NO</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell><StatusBadge value={record.aiViolation} /></TableCell>
                                    <TableCell>
                                        <Select defaultValue={record.actualViolation === null ? "null" : String(record.actualViolation)}>
                                            <SelectTrigger className="w-[80px] h-8 text-xs">
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="null">-</SelectItem>
                                                <SelectItem value="true">YES</SelectItem>
                                                <SelectItem value="false">NO</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink href="#">...</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink href="#">12</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationNext href="#" /></PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </main>
        </div>
    );
}