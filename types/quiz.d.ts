// types/quiz.d.ts
import QuizQuestion from "@/types/question";

export type QuizCreationRequest = {
    title: string;
    description?: string;
    subjectId?: string;
    timeLimit?: number;
    maxAttempts?: number;
    passingScore?: number;
    questions: QuizQuestion[];
  };