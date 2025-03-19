import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from '@clerk/nextjs/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Await params to ensure it's resolved
    await auth.protect()
    
    const { id } = await params;

    const clerdId = await db.student.findUnique({
      where: { id: id },
      select: { clirkId: true },
    });

    const client = await clerkClient();
    // Parse the student ID
    const studentId = id;
    if (!studentId) {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 }
      );
    }
    

    // Delete the student
    await db.student.delete({ where: { id: studentId } });
    await client.users.deleteUser(clerdId!.clirkId);

    // Return success response
    return NextResponse.json({ message: "Student deleted" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
