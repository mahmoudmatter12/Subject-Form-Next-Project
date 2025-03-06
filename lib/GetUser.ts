import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

interface User {
  id: number;
  clirkId: string;
  fname: string;
  lname: string | null;
  email: string;
  role: "STUDENT" | "ADMIN";
  // Add other fields as needed
}

export default async function GetUser(): Promise<User | null> {
  try {
    // Get the current user from Clerk
    const clerkUser = await currentUser();

    if (!clerkUser) { 
      return null;
    }

    // Fetch the user from the database using `clerkId`
    const dbUser = await db.student.findUnique({
      where: {
        clirkId: clerkUser.id, // Use `clerkId` instead of `id`
      },
    });

    if (!dbUser) {
      const newDbUser = await db.student.create({
        data: {
          clirkId: clerkUser.id,
          email: clerkUser.emailAddresses[0].emailAddress,
          fname: clerkUser.firstName || "",
          lname: clerkUser.lastName,
          role: "STUDENT",
          arabicName: "", // Provide a default value or fetch from clerkUser if available
          phoneNumber: "", // Provide a default value or fetch from clerkUser if available
          studentId: "", // Provide a default value or generate a unique ID
          imgUrl: clerkUser.imageUrl, // Fetch the profile image URL from clerkUser
        },
      });
      return newDbUser;
    }
    

    // Return the user object
    return dbUser;

  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}