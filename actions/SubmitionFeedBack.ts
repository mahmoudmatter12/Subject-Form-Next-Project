import { db } from "@/lib/db";

export async function getTotalSubmissions({
  id,
}: {
  id: string;
}): Promise<{ totalSubmissions: number }> {
  const totalSubmissions = await db.submission.count({ where: { studentId: id } });
  return { totalSubmissions };
}

export async function getAcceptedSubmissions({
  id,
}: {
  id: string;
}): Promise<{ accepted: number }> {
  const accepted =
    (await db.submission.count({ where: { status: "ACCEPTED", studentId: id } })) || 0;
  return { accepted };
}

export async function getRejectedSubmissions({
  id,
}: {
  id: string;
}): Promise<{ rejected: number }> {
  const rejected =
    (await db.submission.count({ where: { status: "REJECTED" },studentId: id })) || 0;
  return { rejected };
}

export async function getPendingSubmissions({
  id,
}: {
  id: string;
}): Promise<{ pending: number }> {
  const pending =
    (await db.submission.count({ where: { status: "PENDING" },studentId:id })) || 0;
  return { pending };
}

// Example usage in an async function or component
export async function fetchSubmissionStats(id: string) {
  return {
    totalSubmissions: await getTotalSubmissions({id}),
    acceptedSubmissions: await getAcceptedSubmissions({ id }),
    rejectedSubmissions: await getRejectedSubmissions({id}),
    pendingSubmissions: await getPendingSubmissions({id}),
  };
}
