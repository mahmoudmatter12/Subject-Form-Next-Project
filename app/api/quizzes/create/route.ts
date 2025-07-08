// app/api/quizzes/route.ts
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    // 1. Authentication
    const { userId } = await auth()
    // const userId = "user_2uOuFQeN3UNopBRbVWPi0fO2cMq"
    console.log("User ID:", userId)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Validate request body
    const requestData = await req.json()

    const { description, subjectId, timeLimit, maxAttempts, passingScore, questions } = requestData
    let { title } = requestData

    if (!title || !questions || !Array.isArray(questions)) {
      return NextResponse.json({ error: "Title and questions array are required" }, { status: 400 })
    }

    // 3. Verify the creator is an instructor/admin
    const creator = await db.student.findUnique({
      where: { clirkId: userId },
    })

    if (!creator || (creator.role !== "ADMIN" && creator.role !== "INSTRUCTOR")) {
      return NextResponse.json({ error: "Only instructors or admins can create quizzes" }, { status: 403 })
    }

    // Check if the title is unique
    const existingQuiz = await db.quiz.findFirst({
      where: { title: title },
    })

    if (existingQuiz) {
      return NextResponse.json({ error: "Quiz title must be unique change the Title please" }, { status: 400 })
    }

    title = requestData.title.trim().toUpperCase().replace(/\s+/g, "-")

    // 4. Create the quiz
    const quiz = await db.quiz.create({
      data: {
        title,
        description,
        createdById: creator.id,
        subjectId: subjectId || null,
        timeLimit: timeLimit || 30,
        maxAttempts: maxAttempts || 1,
        passingScore: passingScore || 50,
        questions: {
          create: questions.map((question) => {
            // For SHORT_ANSWER, store the answer in the first option
            console.log("Question:", question)
            if (question.type === "SHORT_ANSWER") {
              return {
                text: question.text,
                type: question.type,
                points: question.points || 1,
                correctAnswer: null,
                textAnswer: question.options[0] || "",
              }
            }

            // For TRUE_FALSE/MULTIPLE_CHOICE
            return {
              text: question.text,
              type: question.type || "MULTIPLE_CHOICE",
              points: question.points || 1,
              options: question.type === "TRUE_FALSE" ? ["True", "False"] : question.options,
              correctAnswer: Number(question.correctAnswer),
            }
          }),
        },
      },
      include: {
        questions: true,
      },
    })

    // 5. Return the created quiz
    // Add this at the end of your POST function, right before the return statement
    // after creating the quiz successfully:

    // Return the created quiz with a socketEvent field
    return NextResponse.json(
      {
        quiz,
        socketEvent: "quiz:created",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[QUIZ_CREATION_ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

