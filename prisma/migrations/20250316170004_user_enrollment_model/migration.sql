-- DropForeignKey
ALTER TABLE "user_enrollments" DROP CONSTRAINT "user_enrollments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "user_enrollments" DROP CONSTRAINT "user_enrollments_subjectId_fkey";

-- AddForeignKey
ALTER TABLE "user_enrollments" ADD CONSTRAINT "user_enrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_enrollments" ADD CONSTRAINT "user_enrollments_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("subjectCode") ON DELETE RESTRICT ON UPDATE CASCADE;
