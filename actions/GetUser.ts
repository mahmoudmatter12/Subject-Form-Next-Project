import { db } from "@/lib/db";

export const GetUser = async (id: string) => {
  if (!id) {
    return null;
  }

  try {
    const student = await db.student.findUnique({
      where: { id: id },
      include: {
        submissions: true, // Include submissions
      },
    });

    if (!student) {
      return null;
    }

    return student;
  } catch (error) {
    console.error("Failed to fetch student:", error);
    return null;
  }
};
