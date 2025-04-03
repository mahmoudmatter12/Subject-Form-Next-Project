import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const quiz = await db.quiz.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
      subject:{
        select:{
            subjectCode: true,
            name: true,
        }
      }
    },
  });

  if (!quiz) {
    return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json({ quiz }, { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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
    // Delete associated questions first
    await db.question.deleteMany({
      where: {
        quizId: id,
      },
    });

    // Delete the quiz
    await db.quiz.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Quiz deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json({ message: "Error deleting quiz" }, { status: 500 });
  }

}
