import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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

    // Fetch the student with their subjects
    const existingStudent = await db.student.findUnique({
      where: { clirkId: id },
      include: { subjects: true }, // Include the subjects relation
    });

    if (!existingStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Get the subjects list of the student
    const subjects = existingStudent.subjects || [];

    return NextResponse.json({ subjects });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}