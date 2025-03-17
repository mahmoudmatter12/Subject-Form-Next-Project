/*
  Warnings:

  - You are about to drop the column `craetedAt` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the `_StudentToSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentToSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StudentToSubject" DROP CONSTRAINT "_StudentToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentToSubject" DROP CONSTRAINT "_StudentToSubject_B_fkey";

-- DropForeignKey
ALTER TABLE "_StudentToSubmission" DROP CONSTRAINT "_StudentToSubmission_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentToSubmission" DROP CONSTRAINT "_StudentToSubmission_B_fkey";

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "craetedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_StudentToSubject";

-- DropTable
DROP TABLE "_StudentToSubmission";

-- CreateTable
CREATE TABLE "_StudentSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StudentSubjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudentSubjects_B_index" ON "_StudentSubjects"("B");

-- AddForeignKey
ALTER TABLE "cgpa" ADD CONSTRAINT "cgpa_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_enrollments" ADD CONSTRAINT "user_enrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_enrollments" ADD CONSTRAINT "user_enrollments_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_submissions" ADD CONSTRAINT "subject_submissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_submissions" ADD CONSTRAINT "subject_submissions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentSubjects" ADD CONSTRAINT "_StudentSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentSubjects" ADD CONSTRAINT "_StudentSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
