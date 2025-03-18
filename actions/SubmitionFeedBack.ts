import { db } from "@/lib/db";

export async function getTotalSubmissions() {
  const totalSubmissions = await db.submission.count();
  return { totalSubmissions };
}

export async function getAcceptedSubmissions() {
  const accepted = await db.submission.count({ where: { status: "ACCEPTED" } }) || 0;
  return { accepted };
}

export async function getRejectedSubmissions() {
  const rejected = await db.submission.count({ where: { status: "REJECTED" } })||0;
  return { rejected };
}

export async function getPendingSubmissions() {
  const pending = await db.submission.count({ where: { status: "PENDING" } }) || 0;
  return { pending };
}

// Example usage in an async function or component
export async function fetchSubmissionStats() {
  return {
    totalSubmissions: await getTotalSubmissions(),
    acceptedSubmissions: await getAcceptedSubmissions(),
    rejectedSubmissions: await getRejectedSubmissions(),
    pendingSubmissions: await getPendingSubmissions(),
  };
}
