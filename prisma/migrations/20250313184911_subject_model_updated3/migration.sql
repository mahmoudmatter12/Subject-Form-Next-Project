/*
  Warnings:

  - You are about to drop the column `studentId` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `submissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subjectCode]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subjectCode` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subject_submissions" DROP CONSTRAINT "subject_submissions_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "subject_submissions" DROP CONSTRAINT "subject_submissions_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_studentId_fkey";

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_studentId_fkey";

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "studentId",
ADD COLUMN     "subjectCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "pdfUrl";

-- CreateTable
CREATE TABLE "_StudentToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StudentToSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_StudentToSubmission" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StudentToSubmission_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudentToSubject_B_index" ON "_StudentToSubject"("B");

-- CreateIndex
CREATE INDEX "_StudentToSubmission_B_index" ON "_StudentToSubmission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_subjectCode_key" ON "subjects"("subjectCode");

-- AddForeignKey
ALTER TABLE "_StudentToSubject" ADD CONSTRAINT "_StudentToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubject" ADD CONSTRAINT "_StudentToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubmission" ADD CONSTRAINT "_StudentToSubmission_A_fkey" FOREIGN KEY ("A") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubmission" ADD CONSTRAINT "_StudentToSubmission_B_fkey" FOREIGN KEY ("B") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
