import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const students = await db.student.findMany();
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { email, studentId, firstName, lastName, arabicName, phoneNumber, clerkId } = data;

    // Validate the user data
    if (!email || !studentId || !firstName || !lastName || !arabicName || !phoneNumber) {
      return NextResponse.json({ error: 'Please fill in all the fields' }, { status: 400 });
    }

    if(!email.includes('@')|| !email.includes('.')){
      return NextResponse.json({ error: 'Please enter a valid email' }, { status: 400 });
    }

    // Check if the email already exists
    const existingStudent = await db.student.findUnique({
      where: { email: data.email },
    });

    const exsitingStudentId = await db.student.findUnique({
      where: { studentId: data.studentId },
    });

    if (existingStudent) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    if (exsitingStudentId) {
      return NextResponse.json({ error: 'Student ID already exists' }, { status: 409 });
    }

    // Save the user data to the database
    const newStudent = await db.student.create({
      data: {
        clirkId: clerkId,
        fname: firstName,
        lname: lastName,
        arabicName: arabicName,
        email: email,
        phoneNumber: phoneNumber,
        studentId: studentId,
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Error saving student:', error);
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}

