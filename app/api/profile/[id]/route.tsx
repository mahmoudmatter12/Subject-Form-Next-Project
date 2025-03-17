import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
        }

        const student = await db.StudentProfile.findUnique({
            where: { studentId: id },
        });

        if (!student) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        return NextResponse.json(student, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json({ error: "Failed to fetch student" }, { status: 500 });
    }
}