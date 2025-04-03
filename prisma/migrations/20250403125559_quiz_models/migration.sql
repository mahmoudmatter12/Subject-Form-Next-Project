/*
  Warnings:

  - You are about to drop the `subject_submissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'INSTRUCTOR';

-- DropForeignKey
ALTER TABLE "subject_submissions" DROP CONSTRAINT "subject_submissions_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "subject_submissions" DROP CONSTRAINT "subject_submissions_submissionId_fkey";

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "LinkedInLink" TEXT;

-- DropTable
DROP TABLE "subject_submissions";

-- CreateTable
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "subjectId" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "options" TEXT[],
    "correctAnswer" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 1,
    "quizId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_submissions" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "feedback" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gradedAt" TIMESTAMP(3),

    CONSTRAINT "quiz_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedOption" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "quizSubmissionId" TEXT NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_submissions" ADD CONSTRAINT "quiz_submissions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_submissions" ADD CONSTRAINT "quiz_submissions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_quizSubmissionId_fkey" FOREIGN KEY ("quizSubmissionId") REFERENCES "quiz_submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
