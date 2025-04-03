/*
  Warnings:

  - Added the required column `isPassed` to the `quiz_submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "textResponse" TEXT,
ADD COLUMN     "tureFalseResponse" BOOLEAN,
ALTER COLUMN "selectedOption" DROP NOT NULL;

-- AlterTable
ALTER TABLE "quiz_submissions" ADD COLUMN     "isPassed" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "maxAttempts" INTEGER DEFAULT 1,
ADD COLUMN     "passingScore" INTEGER DEFAULT 50,
ADD COLUMN     "timeLimit" INTEGER DEFAULT 30;
