import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { subjectName, subjectCode, isOpen, prerequisites } = await request.json();
        const Prerequisites = prerequisites ? prerequisites.split(',').map((prerequisite: string) => prerequisite.trim()) : [];

        // Log the request body for debugging
        // console.log('Request Body:', { subjectName, subjectCode, isOpen, prerequisites })

        const existingSubject = await db.subject.findFirst({
            where: {
                subjectCode: subjectCode,
            },
        });

        if (existingSubject) {
            return NextResponse.json({ error: 'Subject code already exists' }, { status: 405 });
        }

        const newSubject = await db.subject.create({
            data: {
                name: subjectName,
                subjectCode: subjectCode,
                isOpen: isOpen,
                prerequisites: Prerequisites || [] // Default to an empty array
            },
        });

        return NextResponse.json(newSubject, { status: 201 });
    } catch (error) {
        console.error('Error creating subject:', error);

        return NextResponse.json({ error: 'Failed to create subject' }, { status: 500 });
    }
}