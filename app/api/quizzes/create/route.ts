// app/api/quizzes/route.ts
import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
import { QuestionType } from '@prisma/client';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    // 1. Authentication
    // const  {userId}  = await auth();
    const userId = "user_2uOuFQeN3UNopBRbVWPi0fO2cMq" 
    console.log('User ID:', userId);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    // 2. Validate request body
    const requestData = await req.json();
    
    const { title, description, subjectId, timeLimit, maxAttempts, passingScore, questions } = requestData;

    if (!title || !questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { error: 'Title and questions array are required' },
        { status: 400 }
      );
    }

    // 3. Verify the creator is an instructor/admin
    const creator = await db.student.findUnique({
      where: { clirkId: userId },
    });

    if (!creator || (creator.role !== 'ADMIN' && creator.role !== 'INSTRUCTOR')) {
      return NextResponse.json(
        { error: 'Only instructors or admins can create quizzes' },
        { status: 403 }
      );
    }

    console.log('Creator :', creator);

    // 4. Create the quiz with questions
    // Ensure the user exists in the database

    const quiz = await db.quiz.create({
      data: {
        title,
        description,
        createdById: creator.id,
        subjectId: subjectId || null,
        timeLimit: timeLimit || 30,
        maxAttempts: maxAttempts || 1,
        passingScore: passingScore || 50,
        questions: {
          create: questions.map((question: {
            text: string;
            type?: QuestionType;
            options: string[];
            correctAnswer: number;
            points?: number;
          }) => ({
            text: question.text,
            type: question.type || 'MULTIPLE_CHOICE',
            options: question.options,
            correctAnswer: question.correctAnswer,
            points: question.points || 1
          }))
        }
      },
      include: {
        questions: true
      }
    });

    // 5. Return the created quiz
    return NextResponse.json(quiz, { status: 201 });

  } catch (error) {
    console.error('[QUIZ_CREATION_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}