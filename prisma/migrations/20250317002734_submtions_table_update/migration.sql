-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "submissionId" TEXT;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
