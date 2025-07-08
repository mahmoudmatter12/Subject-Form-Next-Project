// Endpoint to fetch quiz attempts with registration data

import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    // const userId = "user_2uOuFQeN3UNopBRbVWPi0fO2cMq" // For testing purposes, replace with actual userId from auth
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const quizId = searchParams.get("quizId")

    const student = await db.student.findUnique({
      where: { clirkId: userId },
    })

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    // Get both attempts and registrations
    const [attempts, registrations] = await Promise.all([
      // Get attempts
      db.quizAttempt.findMany({
        where: quizId ? { studentId: student.id, quizId } : { studentId: student.id },
        orderBy: { completedAt: "desc" },
      }),

      // Get registrations
      db.quizRegistration.findMany({
        where: quizId ? { studentId: student.id, quizId } : { studentId: student.id },
        include: {
          quiz: {
            select: {
              id: true,
              title: true,
              dueDate: true,
              maxAttempts: true,
            },
          },
        },
      }),
    ])

    return NextResponse.json({
      attempts,
      registrations,
    })
  } catch (error) {
    console.error("Error fetching quiz attempts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

