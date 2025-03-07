// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import student from "@/types/student";
// import { redirect } from "next/navigation";

// export default async function GetUser(onboarding): Promise<student | null> {
//   try {
//     const user = await currentUser();

//     if (!user) {
//       redirect("/sign-in");
//     }

//     const student = await db.student.findFirstOrThrow({
//       where: {
//         clirkId: user.id,
//       },
//     });

//     if(!student) {
//       redirect("/onboarding");
//     }
//     return student;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface Path {
  pathName?: string;
}

export const GetUser = async ({ pathName }: Path = { pathName: "" }) => {
  const { userId } = await auth();

  if (!userId && pathName !== "/") {
    console.log("no user auth");
    return redirect("/sign-in");
  }
  if(!userId) {
    return null;
  }

  const Student = await db.student.findFirst({
    where: { clirkId: userId },
  });

  if (!Student) {
    console.log("no profile");
    // return redirect("/onboarding");
  }

  if (
    Student &&
    !Student.onboarded &&
    pathName !== "/onboarding" &&
    pathName !== "/"
  ) {
    redirect("/onboarding");
  }

  return Student;
};
