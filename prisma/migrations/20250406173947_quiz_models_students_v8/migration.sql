/*
  Warnings:

  - You are about to drop the column `joinedStudents` on the `quizzes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "joinedStudents";

-- CreateTable
CREATE TABLE "_RegisteredStudentsRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RegisteredStudentsRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RegisteredStudentsRelation_B_index" ON "_RegisteredStudentsRelation"("B");

-- AddForeignKey
ALTER TABLE "_RegisteredStudentsRelation" ADD CONSTRAINT "_RegisteredStudentsRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegisteredStudentsRelation" ADD CONSTRAINT "_RegisteredStudentsRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
