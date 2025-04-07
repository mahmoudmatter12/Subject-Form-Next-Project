/*
  Warnings:

  - You are about to drop the column `attempts` on the `quizzes` table. All the data in the column will be lost.
  - The `status` column on the `user_enrollments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz_submissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_questionId_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_quizSubmissionId_fkey";

-- DropForeignKey
ALTER TABLE "quiz_submissions" DROP CONSTRAINT "quiz_submissions_quizId_fkey";

-- DropForeignKey
ALTER TABLE "quiz_submissions" DROP CONSTRAINT "quiz_submissions_studentId_fkey";

-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "attempts",
ADD COLUMN     "attemptsNum" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "user_enrollments" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ENROLLED';

-- DropTable
DROP TABLE "answers";

-- DropTable
DROP TABLE "quiz_submissions";

-- CreateTable
CREATE TABLE "quiz_answers" (
    "id" TEXT NOT NULL,
    "quizAttemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedOption" INTEGER,
    "textResponse" TEXT,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempts" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "isPassed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_registrations" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quiz_registrations_studentId_quizId_key" ON "quiz_registrations"("studentId", "quizId");

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_quizAttemptId_fkey" FOREIGN KEY ("quizAttemptId") REFERENCES "quiz_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_registrations" ADD CONSTRAINT "quiz_registrations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_registrations" ADD CONSTRAINT "quiz_registrations_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
