import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
    try {
        const quiz = await db.quiz.findUnique({
            where: {
                id: id,
            },
        });
        if (!quiz) {
            return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
        }
        const { isPublished } = quiz;

        // Update the quiz
        await db.quiz.update({
            where: {
                id: id,
            },
            data: {
                isPublished: !isPublished, // Toggle the isPublished status
            },
        });

        return NextResponse.json({ message: `Quiz updated successfully, Quiz is now ${!isPublished ? "published" : "Not published"}`, quiz: quiz }, { status: 200 });
    }
    catch (error) {
        console.error("Error updating quiz:", error);
        return NextResponse.json({ message: "Error updating quiz" }, { status: 500 });
    }
}