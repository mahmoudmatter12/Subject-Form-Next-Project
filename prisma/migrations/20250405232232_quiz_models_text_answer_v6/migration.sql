-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "textAnswer" TEXT,
ALTER COLUMN "correctAnswer" DROP NOT NULL;
