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
        { error: "Subject ID is required" },
        { status: 400 }
      );
    }

    // Check if the subject exists
    const Subjects = await db.subject.findUnique({
      where: { id: id },
    });

    // if (!existingStudent) {
    //   return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    // }

    // // Get the subjects list of the student
    // const subjects = await db.subject.findMany({
    //   where: { studentId: id },
    // });

    return NextResponse.json({ Subjects });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Check if the subject ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Subject ID is required" },
        { status: 400 }
      );
    }

    // Check if the subject exists
    const existingSubject = await db.subject.findUnique({
      where: { id: id },
    });

    if (!existingSubject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    // Toggle the `isOpen` status
    const updatedSubject = await db.subject.update({
      where: { id: id },
      data: { isOpen: !existingSubject.isOpen }, // Toggle the value
    });

    return NextResponse.json({ updatedSubject });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // Check if the subject ID is provided
  if (!id) {
    return NextResponse.json(
      { error: "Subject ID is required" },
      { status: 400 }
    );
  }
  // Delete the subject
  await db.subject.delete({ where: { id: id } });

  return NextResponse.json({ message: "Subject deleted successfully" });

}
