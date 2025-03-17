/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_enrollments" DROP CONSTRAINT "user_enrollments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "user_enrollments" DROP CONSTRAINT "user_enrollments_subjectId_fkey";

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "CGPA_Letter" TEXT,
ADD COLUMN     "cgpa" TEXT,
ADD COLUMN     "fullName" TEXT;

-- DropTable
DROP TABLE "profile";

-- AddForeignKey
ALTER TABLE "user_enrollments" ADD CONSTRAINT "user_enrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_enrollments" ADD CONSTRAINT "user_enrollments_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
