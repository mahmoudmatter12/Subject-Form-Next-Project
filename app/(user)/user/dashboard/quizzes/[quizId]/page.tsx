"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Clock, Award, BookOpen, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import QuizSession from "@/components/quizzes/QuizSession"

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

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])
  const [loading, setLoading] = useState(true)
  const [quizStarted, setQuizStarted] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { quizId } =  await params
        const response = await fetch(`/api/quizzes/${quizId}`)
        if (!response.ok) throw new Error("Failed to fetch quiz")

        const data = await response.json()
        setQuiz(data.quiz)

        // Fetch user's attempts for this quiz
        fetchUserAttempts(quizId)
      } catch (error) {
        console.error("Error fetching quiz:", error)
        toast.error("Failed to load quiz")
        router.push("/user/dashbaord/quizzes")
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [params, router])

  const fetchUserAttempts = async (quizId: string) => {
    try {
      const response = await fetch(`/api/quizzes/quiz-attempts?quizId=${quizId}`)
      if (!response.ok) throw new Error("Failed to fetch attempts")

      const data = await response.json()
      setAttempts(data.attempts || [])
    } catch (error) {
      console.error("Error fetching attempts:", error)
    }
  }

  const isQuizAvailable = (quiz: Quiz) => {
    if (!quiz.dueDate) return true

    const now = new Date()
    const dueDate = new Date(quiz.dueDate)
    return now <= dueDate
  }

  const getAttemptsRemaining = (quiz: Quiz) => {
    if (quiz.maxAttempts === 0) return "Unlimited"

    const attemptsUsed = attempts.length
    return Math.max(0, quiz.maxAttempts - attemptsUsed)
  }

  const canTakeQuiz = (quiz: Quiz) => {
    if (!isQuizAvailable(quiz)) return false

    if (quiz.maxAttempts === 0) return true

    const attemptsRemaining = getAttemptsRemaining(quiz)
    return attemptsRemaining !== 0 && attemptsRemaining !== "Unlimited"
  }

  const getBestScore = () => {
    if (attempts.length === 0) return null

    return Math.max(...attempts.map((a) => a.score))
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  const  handleQuizComplete =async (score: number) => {
    const { quizId } = await params
    // Refresh attempts after completion
    fetchUserAttempts(quizId)

    // Show success message
    toast.success(`Quiz completed! Your score: ${score}%`)

    // Reset quiz state
    setQuizStarted(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-10 w-1/2 bg-gray-700 mb-4" />
        <Card className="bg-gray-800/50 border-gray-700">
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
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Quiz not found</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            The quiz youre looking for doesnt exist or may have been removed.
          </p>
          <Button onClick={() => router.push("/user/quizzes")}>Back to Quizzes</Button>
        </div>
      </div>
    )
  }

  // If quiz has started, show the quiz session
  if (quizStarted) {
    return <QuizSession quiz={quiz} onComplete={handleQuizComplete} />
  }

  const isAvailable = isQuizAvailable(quiz)
  const attemptsRemaining = getAttemptsRemaining(quiz)
  const bestScore = getBestScore()
  const canStart = canTakeQuiz(quiz)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="outline" onClick={() => router.push("/user/dashboard/quizzes")} className="mb-4">
          ← Back to Quizzes
        </Button>
        <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <BookOpen className="h-4 w-4 text-indigo-400" />
          <span className="text-gray-400">
            {quiz.subject.name} ({quiz.subject.subjectCode})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quiz Information</CardTitle>
              {quiz.description && <CardDescription className="text-gray-400">{quiz.description}</CardDescription>}
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Time Limit</p>
                    <p className="font-medium text-white text-lg">{quiz.timeLimit} minutes</p>
                  </div>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4 flex items-center gap-3">
                  <Award className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Passing Score</p>
                    <p className="font-medium text-white text-lg">{quiz.passingScore}%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Quiz Rules</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>You have {quiz.timeLimit} minutes to complete this quiz.</li>
                  <li>The quiz consists of {quiz.questions.length} questions.</li>
                  <li>You need to score at least {quiz.passingScore}% to pass.</li>
                  <li>
                    {quiz.maxAttempts === 0
                      ? "You have unlimited attempts for this quiz."
                      : `You have a maximum of ${quiz.maxAttempts} attempts for this quiz.`}
                  </li>
                  <li>Once you start the quiz, the timer cannot be paused.</li>
                  <li>If you leave the quiz, the timer will continue to run.</li>
                  <li>Your answers are automatically saved as you progress.</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={!canStart}
                onClick={handleStartQuiz}
              >
                {!isAvailable ? "Quiz Unavailable" : attemptsRemaining === 0 ? "No Attempts Remaining" : "Start Quiz"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800/50 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Quiz Status</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status:</span>
                <Badge className={`${!isAvailable ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                  {!isAvailable ? "Closed" : "Open"}
                </Badge>
              </div>

              {quiz.dueDate && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Due Date:</span>
                  <span className="text-white">{new Date(quiz.dueDate).toLocaleDateString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Attempts Remaining:</span>
                <span className="text-white">{attemptsRemaining}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Questions:</span>
                <span className="text-white">{quiz.questions.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Points:</span>
                <span className="text-white">{quiz.questions.reduce((sum, q) => sum + q.points, 0)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Your Attempts</CardTitle>
            </CardHeader>

            <CardContent>
              {attempts.length === 0 ? (
                <p className="text-gray-400 text-center py-4">You havent attempted this quiz yet.</p>
              ) : (
                <div className="space-y-4">
                  {attempts.map((attempt, index) => (
                    <div key={attempt.id} className="bg-gray-700/50 p-3 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Attempt {index + 1}</p>
                        <p className="text-xs text-gray-500">{new Date(attempt.completedAt).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {attempt.score >= quiz.passingScore ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                        <span
                          className={`font-medium ${
                            attempt.score >= quiz.passingScore ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {attempt.score}%
                        </span>
                      </div>
                    </div>
                  ))}

                  {bestScore !== null && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Best Score:</span>
                        <span
                          className={`font-medium text-lg ${
                            bestScore >= quiz.passingScore ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {bestScore}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

