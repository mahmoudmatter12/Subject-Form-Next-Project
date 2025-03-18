import { db } from "@/lib/db";

export async function getTotalEnrolledSubjects() {
  const totalEnrolledSubjects = await db.userEnrollment.count();
  return { totalEnrolledSubjects };
}

export async function fetchEnrolledSubjects() {
  return {
    totalEnrolledSubjects: await getTotalEnrolledSubjects(),
  };
}
