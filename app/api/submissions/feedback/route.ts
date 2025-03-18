import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    const totalSubmissions = await db.submission.count();
    const accepted = await db.submission.count({ where: { status: "ACCSEPTED" } });
    const rejected = await db.submission.count({ where: { status: "REJECTED" } });
    const pending = await db.submission.count({ where: { status: "PENDING" } });
    
    return NextResponse.json({
        totalSubmissions,
        accepted,
        rejected,
        pending,
    });
}