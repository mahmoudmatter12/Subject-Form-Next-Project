import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Save the user data to the database
    const newStudent = await db.student.create({
      data: {
        clirkId: data.clerkId,
        fname: data.firstName,
        lname: data.lastName,
        arabicName: data.arabicName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        studentId: data.studentId,
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ error: 'Failed to save user data' }, { status: 500 });
  }
}