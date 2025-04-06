import Subject from "./subject";
interface Answer {
    id: string;
    questionId: string;
    selectedOption?: number; // For MCQ: index of chosen option
    textResponse?: string; // For short-answer questions
    trueFalseResponse?: boolean; // For true/false questions
    isCorrect: boolean;
    quizSubmissionId: string;
}
interface Question {
    id: string;
    text: string;
    type: string;
    options: string[];
    correctAnswer: number | string;
    textAnswer: string;
    points: number;
    quizId: string;
    createdAt: string;
    answers: Answer[];
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

export type { Quiz, Question};