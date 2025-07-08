import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params
  try {
    const quiz = await db.quiz.findUnique({
      where: {
        id: id,
      },
      include: {
        subject: true,
        createdBy: {
          select: {
            fullName: true,
          },
        },
      },
    })

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 })
    }

    const { isPublished } = quiz

    // Update the quiz
    const updatedQuiz = await db.quiz.update({
      where: {
        id: id,
      },
      data: {
        isPublished: !isPublished, // Toggle the isPublished status
      },
      include: {
        subject: true,
        createdBy: {
          select: {
            fullName: true,
          },
        },
      },
    })

    // Return the updated quiz with a socketEvent field to trigger socket emission
    return NextResponse.json(
      {
        message: `Quiz updated successfully, Quiz is now ${!isPublished ? "published" : "Not published"}`,
        quiz: updatedQuiz,
        socketEvent: !isPublished ? "quiz:published" : "quiz:unpublished",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error updating quiz:", error)
    return NextResponse.json({ message: "Error updating quiz" }, { status: 500 })
  }
}
