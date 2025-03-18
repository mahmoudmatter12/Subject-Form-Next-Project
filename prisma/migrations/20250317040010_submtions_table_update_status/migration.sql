/*
  Warnings:

  - You are about to drop the column `isApproved` on the `submissions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('ACCSEPTED', 'REJECTED', 'PENDING');

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "isApproved",
ADD COLUMN     "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING';
