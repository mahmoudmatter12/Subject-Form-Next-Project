/*
  Warnings:

  - You are about to drop the `FailedSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubjectToSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN');

-- DropForeignKey
ALTER TABLE "FailedSubject" DROP CONSTRAINT "FailedSubject_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_studentId_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToSubmission" DROP CONSTRAINT "_SubjectToSubmission_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToSubmission" DROP CONSTRAINT "_SubjectToSubmission_B_fkey";

-- DropTable
DROP TABLE "FailedSubject";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "Submission";

-- DropTable
DROP TABLE "_SubjectToSubmission";

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "clirkId" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "imgUrl" TEXT,
    "academicGuide" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cgpa" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "cgpa" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cgpa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failed_subjects" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "failed_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "pdfUrl" TEXT,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT false,
    "prerequisites" INTEGER[],

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_submissions" (
    "submissionId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "subject_submissions_pkey" PRIMARY KEY ("submissionId","subjectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_clirkId_key" ON "students"("clirkId");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_studentId_key" ON "students"("studentId");

-- CreateIndex
CREATE INDEX "students_clirkId_email_studentId_idx" ON "students"("clirkId", "email", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "cgpa_studentId_key" ON "cgpa"("studentId");

-- AddForeignKey
ALTER TABLE "cgpa" ADD CONSTRAINT "cgpa_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "failed_subjects" ADD CONSTRAINT "failed_subjects_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_submissions" ADD CONSTRAINT "subject_submissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_submissions" ADD CONSTRAINT "subject_submissions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
