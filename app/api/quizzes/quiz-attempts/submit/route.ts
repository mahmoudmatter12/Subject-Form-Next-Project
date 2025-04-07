import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { Question } from "@/types/Quiz"
export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    // const userId = "user_2uOuFQeN3UNopBRbVWPi0fO2cMq" // For testing purposes, replace with actual userId from auth
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { quizId, answers, score, timeSpent } = await req.json()

    if (!quizId || !answers || score === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get the student
    const student = await db.student.findUnique({
      where: { clirkId: userId },
    })

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    // Check if the quiz exists
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    })

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
    }

    // Check if the student has reached the maximum number of attempts
    if (quiz.maxAttempts > 0) {
      const attemptCount = await db.quizAttempt.count({
        where: {
          studentId: student.id,
          quizId: quiz.id,
        },
      })

      console.log("Attempt count:", attemptCount)

      if (attemptCount >= quiz.maxAttempts) {
        return NextResponse.json(
          { error: "You have reached the maximum number of attempts for this quiz" },
          { status: 400 },
        )
      }
    }

    // Create a new attempt
    const attempt = await db.quizAttempt.create({
      data: {
        studentId: student.id,
        quizId: quiz.id,
        score,
        timeSpent: timeSpent || 0,
        completedAt: new Date(),
        isPassed: score >= quiz.passingScore,
      },
    })

    // Save the answers
    for (const answer of answers) {
      const question = quiz.questions.find((q:Question) => q.id === answer.questionId)
      if (!question) continue

      let isCorrect = false

      if (question.type === "SHORT_ANSWER") {
        // For short answer, compare text (case insensitive)
        const correctAnswer = question.textAnswer?.toLowerCase().trim() || ""
        const userAnswer = answer.textResponse?.toLowerCase().trim() || ""
        isCorrect = correctAnswer === userAnswer
      } else {
        // For multiple choice or true/false
        isCorrect = answer.selectedOption === question.correctAnswer
      }

      await db.quizAnswer.create({
        data: {
          quizAttemptId: attempt.id,
          questionId: answer.questionId,
          selectedOption: answer.selectedOption,
          textResponse: answer.textResponse,
          isCorrect,
        },
      })
    }

    return NextResponse.json({ message: "Quiz submitted successfully", attempt }, { status: 201 })
  } catch (error) {
    console.error("Error submitting quiz:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// to test the API, you can use the following curl command:
// curl -X POST http://localhost:3000/api/quizzes/quiz-attempts/submit -H "Content-Type: application/json" -d '{"quizId": "quiz_123", "answers": [{"questionId": "question_1", "selectedOption": "A", "textResponse": ""}], "score": 80, "timeSpent": 120}'
// Make sure to replace the URL with your actual API endpoint and adjust the data as needed.
// This command sends a POST request to the API with a sample quiz submission data.
// You can also use Postman or any other API testing tool to test the endpoint.
// Make sure to adjust the data in the request body according to your API's requirements.   


// You can also use Postman or any other API testing tool to test the endpoint.
// Make sure to adjust the data in the request body according to your API's requirements.
//
// This command sends a POST request to the API with a sample quiz submission data.
// Make sure to replace the URL with your actual API endpoint and adjust the data as needed.
//
// This command sends a POST request to the API with a sample quiz submission data.
// You can also use Postman or any other API testing tool to test the endpoint.
// Make sure to adjust the data in the request body according to your API's requirements.
//
// This command sends a POST request to the API with a sample quiz submission data.
// Make sure to replace the URL with your actual API endpoint and adjust the data as needed.
//
// This command sends a POST request to the API with a sample quiz submission data.
// You can also use Postman or any other API testing tool to test the endpoint.
// Make sure to adjust the data in the request body according to your API's requirements.

// to test in postman:
// 1. Open Postman and create a new request.
// 2. Set the request type to POST.
// 3. Enter the URL: http://localhost:3000/api/quizzes/quiz-attempts/submit
// 4. In the Headers tab, set Content-Type to application/json.
// 5. In the Body tab, select raw and enter the following JSON:
// {
//   "quizId": "quiz_123",
//   "answers": [
//     {
//       "questionId": "question_1",
//       "selectedOption": "A",
//       "textResponse": ""
//     }
//   ],
//   "score": 80,
//   "timeSpent": 120
// }
// 6. Click Send to send the request.