import { db } from "@/lib/db";

export async function getTotalEnrolledSubjects({ id }: { id: string }): Promise<{ totalEnrolledSubjects: number }> {
  const totalEnrolledSubjects = await db.userEnrollment.count({ where: { studentId: id } });
  return {
    totalEnrolledSubjects,
  };
}
