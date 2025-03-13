import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function MakeClosed(subjectId: string) {
    try {
        // Check if the subject ID is provided
        if (!subjectId) {
        return NextResponse.json(
            { error: "Subject ID is required" },
            { status: 400 }
        );
        }

        console.log('working')
    
        // Check if the subject exists
        const existingSubject = await db.subject.findUnique({
        where: { id: subjectId },
        });
    
        if (!existingSubject) {
        return NextResponse.json({ error: "Subject not found" }, { status: 404 });
        }
    
        // Update the subject to open
        const updatedSubject = await db.subject.update({
        where: { id: subjectId },
        data: { isOpen: false },
        });
    
        return NextResponse.json({ updatedSubject });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
