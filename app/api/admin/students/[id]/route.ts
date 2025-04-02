import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { GetUser } from "@/lib/GetUser";
import student from "@/types/student";

// change the admin role to student role -- must check if the role of the current user is admin or not ?
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Require authentication
    const student = await GetUser() as student;

    if (student.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You are not authorized to access this resource" },
        { status: 403 }
      );
    }
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    const existingStudent = await db.student.findUnique({
      where: { clirkId: id },
    });

    if (!existingStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // change the admin role to student role
    const updatedStudent = await db.student.update({
      where: { clirkId: id },
      data: {
        role: existingStudent.role === "ADMIN" ? "STUDENT" : "ADMIN",
      },
    });

    return NextResponse.json({ updatedStudent });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// to test => /api/admin/students/1