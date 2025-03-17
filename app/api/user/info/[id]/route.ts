import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Check if the clirk ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    const existingStudent = await db.student.findUnique({
      where: { clirkId: id },
      include: { subjects: true }, // Include the subjects relation
    });

    const { studentId } = existingStudent;

    const existingStudentID = await db.cGPA.findUnique({
      where: { studentId : studentId },
    });

    if (!existingStudentID) {
      return NextResponse.json({ error: "Student ID not found" }, { status: 404 });
    }

    const cgpa = existingStudentID.cgpa;


    return NextResponse.json({ studentId , cgpa });

  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
