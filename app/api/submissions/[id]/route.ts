import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Submission ID is required" },
      { status: 400 }
    );
  }

  const submission = await db.submission.findUnique({
    where: { id: id },
    include: {
      subjects: true,
    },
  });

  if (!submission) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(submission);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    console.log(id);

    if (!id) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 }
      );
    }

    const existingSubmission = await db.submission.findUnique({
      where: { id: id },
      include: {
        subjects: true, // Include the related subjects
      },
    });

    if (!existingSubmission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 409 }
      );
    }
    console.log(existingSubmission);
    const subjects = existingSubmission?.subjects.map(
      (subject: { id: string }) => subject.id
    );

    console.log(subjects);
    

    await db.submission.delete({ where: { id: id } });
    await db.UserEnrollment.deleteMany({
      where: {
        subjectId: {
          in: subjects,
        },
      },
    });

    return NextResponse.json({ message: "Submission deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 }
      );
    }

    const existingSubmission = await db.submission.findUnique({
      where: { id: id },
      include: {
        subjects: true, // Include the related subjects
      },
    });

    if (!existingSubmission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { subjects, ...rest } = body;
    const subjectIds = subjects.map((subject: { id: string }) => subject.id);
    if (subjectIds.length === 0) {
      return NextResponse.json(
        { error: "At least 4 subject is required" },
        { status: 400 }
      );
    }

    if (subjectIds.length < 4) {
      return NextResponse.json(
        { error: "Not allowd to submit less than 4" },
        { status: 406 }
      );
    }

    // Update the submission and its related subjects
    const updatedSubmission = await db.submission.update({
      where: { id: id },
      data: {
        ...rest,
        subjects: {
          // Disconnect existing subjects
          disconnect: existingSubmission.subjects.map(
            (subject: { id: string }) => ({ id: subject.id })
          ),
          // Connect new subjects
          connect: subjectIds.map((id: string) => ({ id: id })),
        },
      },
      include: {
        subjects: true, // Include the updated subjects in the response
      },
    });

    return NextResponse.json(updatedSubmission);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}
