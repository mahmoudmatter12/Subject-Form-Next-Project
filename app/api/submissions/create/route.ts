import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("userId", userId);
        const { studentId, selectedSubjects } = await req.json();
        console.log("studentId", studentId);
        console.log("selectedSubjects", selectedSubjects);
        if (!studentId || !selectedSubjects || !Array.isArray(selectedSubjects)) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        // Ensure the student exists
        const studentExists = await db.student.findUnique({
            where: { clirkId: studentId },
        });

        if (!studentExists) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        const { id } = studentExists;

        // Create a new Submission entry
        const submission = await db.submission.create({
            data: {
            studentId: id, // Use direct foreign key reference
            subjects: {
                connect: selectedSubjects.map((subjectId: string) => ({ id: subjectId })),
            },
            },
        });

        // Enroll student in selected subjects
        const enrollments = selectedSubjects.map((subjectId: string) => ({
            studentId: id,
            subjectId,
            status: "ENROLLED", // Default value
        }));

        await db.userEnrollment.createMany({
            data: enrollments,
            skipDuplicates: true,
        });

        return NextResponse.json(
            { message: "Submission successful", submission },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error handling submission:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
