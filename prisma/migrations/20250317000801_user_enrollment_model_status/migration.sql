/*
  Warnings:

  - You are about to drop the column `isPassed` on the `user_enrollments` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PASSED', 'FAILED', 'NOT_ENROLLED', 'ENROLLED');

-- AlterTable
ALTER TABLE "user_enrollments" DROP COLUMN "isPassed",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOT_ENROLLED';

-- DropEnum
DROP TYPE "isPassed";
