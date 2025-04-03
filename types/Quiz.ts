export interface Quiz {
    id: string;
    title: string;
    description: string;
    createdById: string;
    subjectId: string;
    isPublished: boolean;
    dueDate: Date | null;
    timeLimit: number;
    maxAttempts: number;
    passingScore: number;
    createdAt: Date;
    updatedAt: Date;
    questions: Question[];
    subject: Subject;
}
export interface Question {
    id: string;
    text: string;
    type: string;
    options: string[];
    correctAnswer: number;
    points: number;
    quizId: string;
    createdAt: Date;
}
export interface Subject {
    id: string;
    subjectCode: string;
    name: string;
    isOpen: boolean;
    creditHours: number;
    prerequisites: string[];
    createdAt: Date;
    submissionId: string | null;
}
