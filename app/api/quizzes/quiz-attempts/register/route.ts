import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    // const userId = "user_2uOuFQeN3UNopBRbVWPi0fO2cMq"; // For testing purposes, replace with actual userId from auth
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizId } = await req.json();
    if (!quizId) {
      return NextResponse.json(
        { error: "Quiz ID is required" },
        { status: 400 }
      );
    }

    // Get the student
    const student = await db.student.findUnique({
      where: { clirkId: userId },
    });

    // console.log("Student ID:", student.id);

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Check if the quiz exists and is published
    const quiz = await db.quiz.findFirst({
      where: {
        id: quizId,
        isPublished: true,
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found or not published" },
        { status: 404 }
      );
    }

    // Check if the quiz is past its due date
    if (quiz.dueDate && new Date(quiz.dueDate) < new Date()) {
      return NextResponse.json(
        { error: "This quiz is no longer available" },
        { status: 400 }
      );
    }

    // Check if the student has already registered for this quiz
    const existingRegistration = await db.quizRegistration.findFirst({
      where: {
        studentId: student.id,
        quizId: quiz.id,
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "You are already registered for this quiz" },
        { status: 400 }
      );
    }

    // Create a new registration
    const registration = await db.quizRegistration.create({
      data: {
        studentId: student.id,
        quizId: quiz.id,
        registeredAt: new Date(), // Track when the student registered
      },
    });

    return NextResponse.json(
      { message: "Successfully registered for quiz", registration },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering for quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
