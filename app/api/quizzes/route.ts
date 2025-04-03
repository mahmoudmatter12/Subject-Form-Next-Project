import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const quizzes = await db.quiz.findMany(
    {
      include: {
        questions: true,
        subject:true
      },
    }
  );
  return NextResponse.json({quizzes}, { status: 200 }); 
}
