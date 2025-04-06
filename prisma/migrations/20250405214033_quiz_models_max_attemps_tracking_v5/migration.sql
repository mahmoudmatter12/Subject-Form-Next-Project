-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "attempts" INTEGER DEFAULT 0,
ADD COLUMN     "joinedStudents" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "maxAttempts" SET DEFAULT 0;
