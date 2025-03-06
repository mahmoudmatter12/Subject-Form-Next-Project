/*
  Warnings:

  - The primary key for the `cgpa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `failed_subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `subject_submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "cgpa" DROP CONSTRAINT "cgpa_studentId_fkey";

-- DropForeignKey
ALTER TABLE "failed_subjects" DROP CONSTRAINT "failed_subjects_studentId_fkey";

-- DropForeignKey
ALTER TABLE "subject_submissions" DROP CONSTRAINT "subject_submissions_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "subject_submissions" DROP CONSTRAINT "subject_submissions_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_studentId_fkey";

-- AlterTable
ALTER TABLE "cgpa" DROP CONSTRAINT "cgpa_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "cgpa_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cgpa_id_seq";

-- AlterTable
ALTER TABLE "failed_subjects" DROP CONSTRAINT "failed_subjects_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "subjectId" SET DATA TYPE TEXT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "failed_subjects_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "failed_subjects_id_seq";

-- AlterTable
ALTER TABLE "students" DROP CONSTRAINT "students_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "students_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "students_id_seq";

-- AlterTable
ALTER TABLE "subject_submissions" DROP CONSTRAINT "subject_submissions_pkey",
ALTER COLUMN "submissionId" SET DATA TYPE TEXT,
ALTER COLUMN "subjectId" SET DATA TYPE TEXT,
ADD CONSTRAINT "subject_submissions_pkey" PRIMARY KEY ("submissionId", "subjectId");

-- AlterTable
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "prerequisites" SET DATA TYPE TEXT[],
ADD CONSTRAINT "subjects_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "subjects_id_seq";

-- AlterTable
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "submissions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "submissions_id_seq";

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
