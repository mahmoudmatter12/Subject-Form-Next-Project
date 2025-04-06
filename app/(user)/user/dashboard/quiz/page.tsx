"use client"
import React, { useEffect, useState } from 'react'

interface Question {
    id: string;
    text: string;
    type: string;
    options: string[];
    correctAnswer: number;
    points: number;
    quizId: string;
    createdAt: string;
}

interface Subject {
    id: string;
    subjectCode: string;
    name: string;
    isOpen: boolean;
    creditHours: number;
    prerequisites: string[];
    createdAt: string;
    submissionId: string | null;
}

interface Quiz {
    id: string;
    title: string;
    description: string;
    createdById: string;
    subjectId: string;
    isPublished: boolean;
    dueDate: string | null;
    timeLimit: number;
    maxAttempts: number;
    passingScore: number;
    createdAt: string;
    updatedAt: string;
    questions: Question[];
    subject: Subject;
}

interface ApiResponse {
    quizzes: Quiz[];
}

function QuizPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('/api/quizzes');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ApiResponse = await response.json();
                setQuizzes(data.quizzes);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch quizzes');
                console.error('Error fetching quizzes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return <div className="p-4">Loading quizzes...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    if (!quizzes.length) {
        return <div className="p-4">No quizzes available</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Quizzes ({quizzes.length})</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="border rounded-lg p-4 shadow-sm bg-sky-800 text-grray-500">
                        <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
                        <p className="text-gray-600 mb-3">{quiz.description}</p>
                        
                        <div className="mb-4">
                            <h3 className="font-medium mb-1">Subject:</h3>
                            <p>{quiz.subject.name} ({quiz.subject.subjectCode})</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <div>
                                <span className="font-medium">Time Limit:</span> {quiz.timeLimit} mins
                            </div>
                            <div>
                                <span className="font-medium">Max Attempts:</span> {quiz.maxAttempts}
                                <br />
                                <span className="font-medium">Due Date:</span> {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : 'No due date'}
                            </div>
                            <div>
                                <span className="font-medium">Passing Score:</span> {quiz.passingScore}%
                            </div>
                            <div>
                                <span className="font-medium">Status:</span> 
                                <span className={quiz.isPublished ? 'text-green-500' : 'text-yellow-500'}>
                                    {quiz.isPublished ? ' Published' : ' Draft'}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">
                                Questions ({quiz.questions.length})
                            </h3>
                            {quiz.questions.length > 0 ? (
                                <ul className="space-y-3">
                                    {quiz.questions.map((question, qIndex) => (
                                        <li key={question.id} className="border-t pt-2">
                                            <p className="font-medium">{qIndex + 1}. {question.text}</p>
                                            <p className="text-sm text-gray-500">
                                                Type: {question.type} | Points: {question.points}
                                            </p>
                                            {question.options.length > 0 && (
                                                <div className="mt-1">
                                                    <p className="text-sm font-medium">Options:</p>
                                                    <ul className="list-disc list-inside text-sm">
                                                        {question.options.map((option, oIndex) => (
                                                            <li 
                                                                key={oIndex}
                                                                className={oIndex === question.correctAnswer ? 'text-green-600 font-medium' : ''}
                                                            >
                                                                {option}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No questions in this quiz</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizPage;