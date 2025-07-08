import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Count published quizzes
    const publishedCount = await db.quiz.count({
      where: {
        isPublished: true,
      },
    })

    return NextResponse.json({ publishedCount }, { status: 200 })
  } catch (error) {
    console.error("Error counting quizzes:", error)
    return NextResponse.json({ error: "Failed to count quizzes" }, { status: 500 })
  }
}

