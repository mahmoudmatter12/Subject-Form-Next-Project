import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const {id} = await params;

  // Check if the clirk ID is provided
  if (!id) {
    return NextResponse.json(
      { error: "Student ID is required" },
      { status: 400 }
    );
  }

  // Check if the student exists in the database
  const existingStudent = await db.student.findUnique({
    where: { clirkId: id },
  });

  const UserId = existingStudent.id;

  if (!existingStudent) {
    return NextResponse.json(
      { error: "Student ID not found" },
      { status: 404 }
    );
  }

  // Get the student's subjects from the UserEnrollments table that have each userId and the subjectId from the Subjects table
  const subjects = await db.userEnrollment.findMany({
    where: { studentId: UserId },
    select: {
      subject: {
        select: {
          name: true,
          subjectCode: true,
        },
      },
      status: true,
    },
  });

  return NextResponse.json({ subjects });
}

// export async function POST(request: Request) {}
