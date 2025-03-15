import { db } from "@/lib/db";

interface Subject {
  id: string;
  subjectCode: string;
  name: string;
  isOpen: boolean;
  prerequisites: string[];
  status: string;
}

type GetOpenedSubjectsResponse = Subject[] | { error: { message: string } };

export default async function GetOpenedSubjects(): Promise<GetOpenedSubjectsResponse> {
  const subjects = await db.subject.findMany({
    where: {
      isOpen: true,
    },
  });

  if (subjects.length === 0) {
    return {
      error: {
        message: "No subjects found",
      },
    };
  }

  return subjects;
}