// app/api/quizzes/[quizId]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import getIdbyClirckId from '@/actions/IdbyCk';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const userId = "user_2uOuFQeN3UNopBRbVWPi0fO2cMq"; // Hardcoded for testing - remove in production
    // const { userId } = await auth();
    
    try {
        // 1. Authentication
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Get current quiz state with questions
        const currentQuiz = await db.quiz.findUnique({
            where: { id },
            include: {
                questions: true
            }
        });

        if (!currentQuiz) {
            return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
        }

        // 3. Authorization
        const creatorId = await getIdbyClirckId(userId);
        if (currentQuiz.createdById !== creatorId) {
            return NextResponse.json(
                { error: 'Only quiz creator can update this quiz' }, 
                { status: 403 }
            );
        }

        if (currentQuiz.isPublished) {
            return NextResponse.json(
                { error: 'Cannot update published quiz' },
                { status: 403 }
            );
        }

        // 4. Parse and validate request
        const updateData = await req.json();

        const title = updateData.title.trim().toUpperCase().replace(/\s+/g, '-');
        const quizTitle = await db.quiz.findFirst({
            where: { title: title, id: { not: id } } // Exclude current quiz from title check
        });
        
        // Check if the title is unique
        if (quizTitle) {
            return NextResponse.json(
                { note: `${title} already used please change the title` },
                { status: 400 }
            );
        }

        // 5. Prepare quiz metadata updates
        const updatePayload: Record<string, any> = {};
        
        const updatableFields = [
            'title', 'description', 'subjectId', 
            'timeLimit', 'maxAttempts', 'passingScore', 'isPublished'
        ];

        updatableFields.forEach(field => {
            if (updateData[field] !== undefined && updateData[field] !== currentQuiz[field]) {
                updatePayload[field] = updateData[field];
            }
        });

        // 6. Handle questions update/delete
        let questionsDeleted = false;
        const updatedQuiz = await db.$transaction(async (tx) => {
            // Case 1: Empty array provided - delete all questions
            if (updateData.questions && Array.isArray(updateData.questions) && updateData.questions.length === 0) {
                await tx.question.deleteMany({
                    where: { quizId: id }
                });
                questionsDeleted = true;
            }
            // Case 2: Questions array with content - update questions
            else if (updateData.questions && Array.isArray(updateData.questions) && updateData.questions.length > 0) {
                // Create a map of existing questions by text for easy lookup
                const existingQuestionsMap = new Map<string, typeof currentQuiz.questions[0]>();
                currentQuiz.questions.forEach(q => {
                    existingQuestionsMap.set(q.text, q);
                });

                // Process each question in the request
                for (const question of updateData.questions) {
                    const existingQuestion = existingQuestionsMap.get(question.text);
                    
                    if (existingQuestion) {
                        // Update existing question
                        const updateQuestionData: any = {
                            type: question.type || existingQuestion.type,
                            points: question.points ?? existingQuestion.points
                        };

                        // Handle different question types
                        if (question.type === 'SHORT_ANSWER') {
                            updateQuestionData.textAnswer = question.options?.[0] || '';
                            updateQuestionData.correctAnswer = null;
                            updateQuestionData.options = [];
                        } else {
                            updateQuestionData.options = question.options || existingQuestion.options;
                            updateQuestionData.correctAnswer = Number(question.correctAnswer) ?? existingQuestion.correctAnswer;
                            updateQuestionData.textAnswer = null;
                        }

                        await tx.question.update({
                            where: { id: existingQuestion.id },
                            data: updateQuestionData
                        });
                        existingQuestionsMap.delete(question.text); // Mark as processed
                    } else {
                        // Create new question
                        const createQuestionData: any = {
                            text: question.text,
                            type: question.type || 'MULTIPLE_CHOICE',
                            points: question.points ?? 1,
                            quizId: id
                        };

                        if (question.type === 'SHORT_ANSWER') {
                            createQuestionData.textAnswer = question.options?.[0] || '';
                            createQuestionData.correctAnswer = null;
                            createQuestionData.options = [];
                        } else {
                            createQuestionData.options = question.options || 
                                (question.type === 'TRUE_FALSE' ? ['True', 'False'] : ['', '']);
                            createQuestionData.correctAnswer = Number(question.correctAnswer) || 0;
                        }

                        await tx.question.create({
                            data: createQuestionData
                        });
                    }
                }

                // Delete questions that weren't in the update request
                const questionsToDelete = Array.from(existingQuestionsMap.values());
                if (questionsToDelete.length > 0) {
                    await tx.question.deleteMany({
                        where: {
                            id: { in: questionsToDelete.map(q => q.id) }
                        }
                    });
                }
            }

            // Update quiz metadata if there are changes
            if (Object.keys(updatePayload).length > 0) {
                return await tx.quiz.update({
                    where: { id },
                    data: updatePayload,
                    include: { questions: true }
                });
            }

            // If only questions were updated, return the current state
            return await tx.quiz.findUnique({
                where: { id },
                include: { questions: true }
            });
        });

        // 7. Prepare response
        const response: any = {
            success: true,
            quiz: updatedQuiz
        };

        // Add metadata changes if any
        if (Object.keys(updatePayload).length > 0) {
            response.changes = {};
            updatableFields.forEach(field => {
                if (updatedQuiz[field] !== currentQuiz[field]) {
                    response.changes[field] = {
                        from: currentQuiz[field],
                        to: updatedQuiz[field]
                    };
                }
            });
        }

        // Add question changes info
        if (questionsDeleted) {
            response.questionChanges = {
                removed: currentQuiz.questions.length,
                added: 0,
                updated: 0
            };
        } else if (updateData.questions && updateData.questions.length > 0) {
            const currentQuestionTexts = currentQuiz.questions.map(q => q.text);
            const updatedQuestionTexts = updateData.questions.map(q => q.text);
            
            const added = updateData.questions.filter(q => !currentQuestionTexts.includes(q.text)).length;
            const removed = currentQuiz.questions.filter(q => !updatedQuestionTexts.includes(q.text)).length;
            const updated = updateData.questions.length - added;

            response.questionChanges = {
                added,
                updated,
                removed
            };
        }

        return NextResponse.json(response);

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}