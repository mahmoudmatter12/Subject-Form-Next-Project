-- CreateEnum
CREATE TYPE "level" AS ENUM ('FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR');

-- DropForeignKey
ALTER TABLE "cgpa" DROP CONSTRAINT "cgpa_studentId_fkey";

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "Level" "level";

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "fullName" TEXT,
    "arabicName" TEXT,
    "level" "level",
    "cgpa" TEXT,
    "CGPA_Letter" TEXT,
    "phoneNumber" TEXT,
    "academicGuide" "academicGuide",

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_studentId_key" ON "profile"("studentId");
