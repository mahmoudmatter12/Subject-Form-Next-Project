export default interface QuizQuestion {
  text: string;
  type?: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
  options: string[]; // For MCQ/TrueFalse
  correctAnswer: number; // Index for MCQ, 0/1 for TrueFalse
  points?: number;
  quizId: string;
  createdAt: Date;
  updatedAt: Date;
  answers: QuestionAnswer[];
}
type QuestionAnswer = {
  questionId: string;
  selectedOption?: number;
  textResponse?: string;
  tureFalseResponse?: boolean;
  isCorrect?: boolean;
};
