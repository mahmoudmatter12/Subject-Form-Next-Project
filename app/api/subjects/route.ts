import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const subjects = await db.subject.findMany();
        return NextResponse.json({ subjects });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}