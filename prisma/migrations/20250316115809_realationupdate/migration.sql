-- DropForeignKey
ALTER TABLE "cgpa" DROP CONSTRAINT "cgpa_studentId_fkey";

-- AddForeignKey
ALTER TABLE "cgpa" ADD CONSTRAINT "cgpa_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
