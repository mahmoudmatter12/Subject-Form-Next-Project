import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { studentId, firstName, lastName, arabicName, phoneNumber } = data;

    // Validate the user data
    if (!studentId || !firstName || !lastName || !arabicName || !phoneNumber) {
      return NextResponse.json(
        { error: "Please fill in all the fields" },
        { status: 400 }
      );
    }

    const exsitingStudentId = await db.StudentProfile.findUnique({
      where: { studentId: data.studentId },
    });

    if (exsitingStudentId) {
      return NextResponse.json(
        { error: "Student ID already exists" },
        { status: 409 }
      );
    }

    const CGPA = await db.cGPA.findUnique({
      where: { studentId: studentId },
    });

    const { CGPA_Letter } = CGPA;
    const studentCgpa = CGPA.cgpa;

    const profileStudent = await db.StudentProfile.create({
      data: {
        studentId: studentId,
        fullName: firstName + " " + lastName,
        arabicName: arabicName,
        phoneNumber: phoneNumber,
        cgpa: studentCgpa,
        CGPA_Letter: CGPA_Letter,
      },
    });

    return NextResponse.json({ profileStudent }, { status: 201 });
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json(
      { error: "Failed to save user data" },
      { status: 500 }
    );
  }
}
