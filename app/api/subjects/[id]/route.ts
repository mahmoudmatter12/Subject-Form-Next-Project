// Get subjects list of a student by studentId
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    // Check if the student ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Check if the student exists
    const existingStudent = await db.student.findUnique({
      where: { clirkId: id },
    });

    if (!existingStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Get the subjects list of the student
    const subjects = await db.student
      .findUnique({
        where: { clirkId: id },
      })
      .subjects();

    return NextResponse.json({ subjects });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// to test this api -> app/api/subjects/[studentId]/route.ts