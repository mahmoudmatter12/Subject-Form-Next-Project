/*
  Warnings:

  - The `academicGuide` column on the `students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `failed_subjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "isPassed" AS ENUM ('PASSED', 'FAILED', 'NOT_ENROLLED');

-- CreateEnum
CREATE TYPE "academicGuide" AS ENUM ('DR_HELAL', 'DR_SALWA', 'DR_SAFAA', 'DR_SOHA', 'DR_SARA');

-- DropForeignKey
ALTER TABLE "failed_subjects" DROP CONSTRAINT "failed_subjects_studentId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "academicGuide",
ADD COLUMN     "academicGuide" "academicGuide";

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "status" "isPassed" NOT NULL DEFAULT 'FAILED',
ADD COLUMN     "studentId" TEXT;

-- DropTable
DROP TABLE "failed_subjects";

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;
