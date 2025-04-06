
interface Subject {
    id: string;
    subjectCode: string;
    name: string;
    isOpen: boolean;
    creditHours: number;
    prerequisites: string[];
    createdAt: string;
    submissionId: string | null;

}

export default Subject; 


/*
model Subject {
  id                String              @id @default(uuid())
  subjectCode       String              @unique
  name              String
  isOpen            Boolean             @default(false)
  creditHours       Int                 @default(3)
  prerequisites     String[]
  students          Student[]           @relation("StudentSubjects")
  createdAt         DateTime            @default(now())
  UserEnrollment    UserEnrollment[]
  SubjectSubmission SubjectSubmission[]
  Submission        Submission?         @relation(fields: [submissionId], references: [id])
  submissionId      String?

  @@map("subjects")
}
*/ 