import { db } from "@/lib/db"

const numberOfQuizzes = async () => {

    const quizzes = await db.quiz.findMany({
        where: {
            isPublished: true,
        },
    });
    return quizzes.length;
}

export default numberOfQuizzes;