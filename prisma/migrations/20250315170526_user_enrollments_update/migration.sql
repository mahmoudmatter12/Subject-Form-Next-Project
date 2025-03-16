/*
  Warnings:

  - You are about to drop the column `status` on the `subjects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "user_enrollments" (
    "studentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "user_enrollments_pkey" PRIMARY KEY ("studentId","subjectId")
);
