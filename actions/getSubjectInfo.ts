import { db } from "@/lib/db";

export async function getSubjectInfo(subjectId: string): Promise<{
  id: string;
  name: string;
  code: string;
} | null> {
  const subject = await db.subject.findUnique({
    where: { id: subjectId },
    select: {
      id: true,
      name: true,
      code: true,
    },
  });

  if (!subject) {
    return null;
  }

  return subject;
}
