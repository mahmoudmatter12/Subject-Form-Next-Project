import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id}  = await params
    // Check if the clirkId is provided
    if (!id) {
      return NextResponse.json(
        { error: "clirkId is required" },
        { status: 400 }
      );
    }

    // Fetch the student using the clirkId
    const student = await db.student.findUnique({
      where: { clirkId: id },
    });

    // If no student is found, return a 404 error
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Fetch the CGPA for the student using their studentId
    const cgpa = await db.cGPA.findUnique({
      where: { studentId: student.studentId },
    });

    // If no CGPA record is found, return a 404 error
    if (!cgpa) {
      return NextResponse.json(
        { error: "CGPA not found for this student" },
        { status: 404 }
      );
    }

    // Return the CGPA data
    return NextResponse.json( cgpa );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
