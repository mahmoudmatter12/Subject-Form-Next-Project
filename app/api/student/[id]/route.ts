import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// update specific student
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    // Check if the student ID is provided
    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // Parse the request body
    const data = await request.json();
    const {
      fname,
      lname,
      arabicName,
      phoneNumber,
      imgurl,
    } = data;

    // Validate the request body
    if (!fname || !lname || !arabicName || !phoneNumber) {
      return NextResponse.json(
        { error: 'Please fill in all the required fields' },
        { status: 400 }
      );
    }

    // Check if the student exists
    const existingStudent = await db.student.findUnique({
      where: { clirkId: id },
    });

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Update the student data
    const updatedStudent = await db.student.update({
      where: { clirkId: id },
      data: {
        fname,
        lname,
        arabicName,
        phoneNumber,
        imgUrl: imgurl,
      },
    });

    // Return the updated student data
    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    );
  }
}

// get specific student
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    // Check if the student ID is provided
    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // Fetch the student using clirkId
    const student = await db.student.findUnique({
      where: { clirkId: id },
    });

    // Handle case where student is not found
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Return the student data
    return NextResponse.json(student);
  } catch (error) {
    console.error('Error getting student:', error);
    return NextResponse.json(
      { error: 'Failed to get student' },
      { status: 500 }
    );
  }
}