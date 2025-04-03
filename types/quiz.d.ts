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

  export default interface Quiz {
    title: string;
    description?: string;
    subjectId?: string;
    timeLimit?: number;
    maxAttempts?: number;
    passingScore?: number;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
    questions: QuizQuestion[];
  }