import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import student from "@/types/student";

interface Path {
  pathName?: string;
}

export const GetUser = async ({ pathName = "" }: Path = {}): Promise<student | null> => {
  try {
    const { userId } = await auth();

    if (!userId) {
      if (pathName !== "/") {
        console.log("No user authenticated, redirecting to sign-in");
        redirect("/sign-in");
      }
      return null;
    }

    const student = await db.student.findFirst({
      where: { clirkId: userId },  // Fixed 'clirkId' typo
    });

    if (!student) {
      console.log("User authenticated but no student profile found");
      if (pathName !== "/onboarding") {
        redirect("/onboarding");
      }
      return null;
    }

    if (!student.onboarded && pathName !== "/onboarding" && pathName !== "/") {
      console.log("User not onboarded, redirecting to onboarding");
      redirect("/onboarding");
    }

    return student;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
