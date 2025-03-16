import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const subjects = await db.subject.findMany({
            where: {
                isOpen: true,
            },
            select: {
                id: true,
                subjectCode: true,
                name: true,
                isOpen: true,
                prerequisites: true,
                creditHours: true,
            },
        });
        return NextResponse.json({ subjects });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}