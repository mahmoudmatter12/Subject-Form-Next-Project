-- DropForeignKey
ALTER TABLE "cgpa" DROP CONSTRAINT "cgpa_studentId_fkey";

-- AlterTable
ALTER TABLE "cgpa" ALTER COLUMN "studentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cgpa" ADD CONSTRAINT "cgpa_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;
