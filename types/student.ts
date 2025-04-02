import Submission from "./submition";
interface student {
  id?: string;
  clirkId?: string;
  fname?: string;
  lname?: string | null;
  email?: string;
  role?: "STUDENT" | "ADMIN";
  studentId?: string;
  imgUrl?: string;
  arabicName?: string;
  phoneNumber?: string;
  academicGuide?: string;
  cgpa?: string;
  Level?: string;
  Program?: string;
  createdAt?: string;
  updatedAt?: string;
  CGPA_Letter?: string;
  submissions?: Submission[];
  enrolledSubjects?: string[];
  // Add other fields as needed
}

/*
id               String           @id @default(uuid())
  clirkId          String           @unique
  studentId        String           @unique
  fname            String
  lname            String?
  fullName         String?
  arabicName       String?
  email            String           @unique
  phoneNumber      String?
  imgUrl           String?
  Level            level?
  Program          program?
  cgpa             String?
  CGPA_Letter      String?
  academicGuide    academicGuide?
  subjects         Subject[]        @relation("StudentSubjects")
  submissions      Submission[]
  role             Role             @default(STUDENT)
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
  onboarded        Boolean          @default(false)
  enrolledSubjects UserEnrollment[]

*/

export default student;
