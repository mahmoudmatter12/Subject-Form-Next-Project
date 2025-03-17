import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      email,
      studentId,
      firstName,
      lastName,
      arabicName,
      phoneNumber,
      clerkId,
      imgUrl,
      level,
      program,
      academicGuide,
    } = data;

     // Validate the user data
    if (
      !email ||
      !studentId ||
      !firstName ||
      !lastName ||
      !arabicName ||
      !phoneNumber
    ) {
      return NextResponse.json(
        { error: "Please fill in all the fields" },
        { status: 400 }
      );
    }

    if (!email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingStudent = await db.student.findUnique({
      where: { email: data.email },
    });

    const exsitingStudentId = await db.student.findUnique({
      where: { studentId: data.studentId },
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

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

    // Save the user data to the database
    const newStudent = await db.student.create({
      data: {
        clirkId: clerkId,
        fname: firstName,
        lname: lastName,
        fullName: firstName + " " + lastName,
        arabicName: arabicName,
        email: email,
        phoneNumber: phoneNumber,
        studentId: studentId,
        imgUrl: imgUrl,
        onboarded: true,
        cgpa: studentCgpa,
        CGPA_Letter: CGPA_Letter,
        Level: level,
        Program: program,
        academicGuide: academicGuide
      },
    });

    return NextResponse.json({ newStudent }, { status: 201 });
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json(
      { error: "Failed to save user data" },
      { status: 500 }
    );
  }
}
