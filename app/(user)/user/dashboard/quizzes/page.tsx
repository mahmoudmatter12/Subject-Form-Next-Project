"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Clock, Calendar, Award, BookOpen, AlertCircle } from "lucide-react"

interface Question {
  id: string
  text: string
  type: string
  options: string[]
  correctAnswer: number | string
  points: number
}

interface Quiz {
  id: string
  title: string
  description: string
  subjectId: string
  subject: {
    name: string
    subjectCode: string
  }
  isPublished: boolean
  dueDate: string | null
  timeLimit: number
  maxAttempts: number
  passingScore: number
  createdAt: string
  questions: Question[]
  createdBy: {
    fullName: string
  }
}

interface QuizAttempt {
  id: string
  quizId: string
  score: number
  completedAt: string
}

interface QuizRegistration {
  id: string
  quizId: string
  registeredAt: string
  quiz: {
    id: string
    title: string
    dueDate: string | null
    maxAttempts: number
  }
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [attempts, setAttempts] = useState<Record<string, QuizAttempt[]>>({})
  const [registrations, setRegistrations] = useState<Record<string, QuizRegistration>>({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/api/quizzes")
        if (!response.ok) throw new Error("Failed to fetch quizzes")

        const data = await response.json()
        // Filter only published quizzes
        const publishedQuizzes = data.quizzes.filter((quiz: Quiz) => quiz.isPublished)
        setQuizzes(publishedQuizzes)

        // Fetch user's attempts for each quiz
        fetchUserAttemptsAndRegistrations()
      } catch (error) {
        console.error("Error fetching quizzes:", error)
        toast.error("Failed to load quizzes")
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  const fetchUserAttemptsAndRegistrations = async () => {
    try {
      const response = await fetch("/api/quizzes/quiz-attempts")
      if (!response.ok) throw new Error("Failed to fetch attempts")

      const data = await response.json()

      // Organize attempts by quiz ID
      const attemptsByQuiz: Record<string, QuizAttempt[]> = {}
      data.attempts.forEach((attempt: QuizAttempt) => {
        if (!attemptsByQuiz[attempt.quizId]) {
          attemptsByQuiz[attempt.quizId] = []
        }
        attemptsByQuiz[attempt.quizId].push(attempt)
      })

      // Organize registrations by quiz ID
      const registrationsByQuiz: Record<string, QuizRegistration> = {}
      data.registrations.forEach((registration: QuizRegistration) => {
        registrationsByQuiz[registration.quizId] = registration
      })

      setAttempts(attemptsByQuiz)
      setRegistrations(registrationsByQuiz)
    } catch (error) {
      console.error("Error fetching attempts and registrations:", error)
    }
  }

  const handleRegisterForQuiz = async (quizId: string) => {
    try {
      const response = await fetch(`/api/quizzes/quiz-attempts/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId }),
      })

      const data = await response.json()

      if (!response.ok && response.status !== 200) {
        toast.error(data.error || "Failed to register for quiz")
        return
      }

      // If status is 200, user is already registered
      if (response.status === 200) {
        toast.info(data.message)
      } else {
        toast.success("Successfully registered for the quiz")
      }

      // Refresh attempts and registrations
      fetchUserAttemptsAndRegistrations()
    } catch (error) {
      console.error("Error registering for quiz:", error)
      toast.error("Failed to register for quiz")
    }
  }

  const handleStartQuiz = (quizId: string) => {
    router.push(`/user/dashboard/quizzes/${quizId}`)
  }

  const isQuizAvailable = (quiz: Quiz) => {
    // If there's no due date, the quiz is always available
    if (!quiz.dueDate) return true

    const now = new Date()
    const dueDate = new Date(quiz.dueDate)
    return now <= dueDate
  }

  const getAttemptsRemaining = (quiz: Quiz) => {
    if (quiz.maxAttempts === 0) return "Unlimited"

    const quizAttempts = attempts[quiz.id] || []
    const attemptsUsed = quizAttempts.length
    return Math.max(0, quiz.maxAttempts - attemptsUsed)
  }

  const canTakeQuiz = (quiz: Quiz) => {
    // First check if the quiz is available based on due date
    if (!isQuizAvailable(quiz)) return false

    // Then check if the student is registered
    const isRegistered = !!registrations[quiz.id]
    if (!isRegistered) return false

    // Finally check attempts
    if (quiz.maxAttempts === 0) return true

    const attemptsRemaining = getAttemptsRemaining(quiz)
    return attemptsRemaining !== 0 && attemptsRemaining !== "Unlimited"
  }

  const getBestScore = (quizId: string) => {
    const quizAttempts = attempts[quizId] || []
    if (quizAttempts.length === 0) return null

    return Math.max(...quizAttempts.map((a) => a.score))
  }

  const isRegistered = (quizId: string) => {
    return !!registrations[quizId]
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Available Quizzes</h1>
        <p className="text-gray-400">Register for upcoming quizzes or take quizzes youve already registered for.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 bg-gray-700 mb-2" />
                <Skeleton className="h-4 w-1/2 bg-gray-700" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full bg-gray-700 mb-4" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-16 w-full bg-gray-700" />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full bg-gray-700" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : quizzes.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No quizzes available</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            There are currently no published quizzes available. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => {
            const isAvailable = isQuizAvailable(quiz)
            const attemptsRemaining = getAttemptsRemaining(quiz)
            const bestScore = getBestScore(quiz.id)
            const quizRegistered = isRegistered(quiz.id)
            const registrationDate = quizRegistered ? new Date(registrations[quiz.id].registeredAt) : null

            return (
              <Card
                key={quiz.id}
                className={`bg-gray-800/50 border-gray-700 overflow-hidden transition-all hover:shadow-lg ${
                  !isAvailable ? "opacity-70" : ""
                }`}
              >
                {/* Status indicator */}
                <div
                  className={`h-1 w-full ${
                    !isAvailable ? "bg-red-500" : quizRegistered ? "bg-green-500" : "bg-amber-500"
                  }`}
                />

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{quiz.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <BookOpen className="h-4 w-4 text-indigo-400" />
                        <span>
                          {quiz.subject.name} ({quiz.subject.subjectCode})
                        </span>
                      </CardDescription>
                    </div>
                    <Badge
                      className={`${
                        !isAvailable
                          ? "bg-red-500/20 text-red-400"
                          : quizRegistered
                            ? "bg-green-500/20 text-green-400"
                            : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {!isAvailable ? "Closed" : quizRegistered ? "Registered" : "Open"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  {quiz.description && <p className="text-gray-400 mb-4 line-clamp-2">{quiz.description}</p>}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
                      <Clock className="h-4 w-4 text-indigo-400" />
                      <div>
                        <p className="text-xs text-gray-400">Time Limit</p>
                        <p className="font-medium text-white">{quiz.timeLimit} mins</p>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
                      <Award className="h-4 w-4 text-indigo-400" />
                      <div>
                        <p className="text-xs text-gray-400">Passing Score</p>
                        <p className="font-medium text-white">{quiz.passingScore}%</p>
                      </div>
                    </div>

                    {quiz.dueDate ? (
                      <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-indigo-400" />
                        <div>
                          <p className="text-xs text-gray-400">Due Date</p>
                          <p className="font-medium text-white">{new Date(quiz.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-indigo-400" />
                        <div>
                          <p className="text-xs text-gray-400">Due Date</p>
                          <p className="font-medium text-white">No deadline</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
                      <div className="p-1 rounded-full bg-indigo-500/20">
                        <span className="text-indigo-400 text-xs font-bold">?</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Questions</p>
                        <p className="font-medium text-white">{quiz.questions.length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Attempts and score info */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Attempts Remaining:</span>
                      <span className="text-white font-medium">{attemptsRemaining}</span>
                    </div>

                    {bestScore !== null && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Best Score:</span>
                        <span
                          className={`font-medium ${
                            bestScore >= quiz.passingScore ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {bestScore}%
                        </span>
                      </div>
                    )}

                    {registrationDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Registered:</span>
                        <span className="text-white">{registrationDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  {quizRegistered ? (
                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      disabled={!canTakeQuiz(quiz)}
                      onClick={() => handleStartQuiz(quiz.id)}
                    >
                      {canTakeQuiz(quiz) ? "Start Quiz" : "Quiz Unavailable"}
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      disabled={!isAvailable}
                      onClick={() => handleRegisterForQuiz(quiz.id)}
                    >
                      Register for Quiz
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

