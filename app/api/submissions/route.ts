import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // console.log(userId);
    const exsitingUser = await db.student.findUnique({
      where: {
        clirkId: userId,
      },
    });

    if (!exsitingUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const { id } = exsitingUser;
    // Fetch submissions for the logged-in student
    const submissions = await db.submission.findMany({
    //   where: { studentId: id },
      include: {
        subjects: { select: { id: true, name: true } }, // Get subject details
      },
      orderBy: { createdAt: "desc" }, // Latest first
    });

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
