-- CreateEnum
CREATE TYPE "program" AS ENUM ('Data_Science', 'Robotics', 'Muiltimedia');

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "Program" "program";

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "Program" "program";
