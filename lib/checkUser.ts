import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function checkUser() {
  const Student = await currentUser();


//!   first check of the authenticated or not 
//!   then get the logged in user in constant to check if user exists in database
//!   then check if user exists in database
//!   if user exists in database then return user
//!   else add the user to the database and return user


//  first check of the authenticated or not
    if (!Student) {
        return null;
    }
    

//  then check if user exists in database
    const dbUser = await db.student.findUnique({
        where: {
            id: Number(Student.id),
        },
    });

//  if user exists in database then return user
    if (dbUser) {
        return dbUser;
    }

//  else add the user to the database and return user
try {
    const newUser = await db.student.create({
        data: {
            clirkId: Student.id,
            fname: Student.firstName || '',
            lname: Student.lastName || '',
            imgUrl: Student.imageUrl,
            email: Student.emailAddresses[0].emailAddress,
        },
    });

    return newUser;
} catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('ClerkId')) {
        // User already exists, fetch the existing user
        const existingUser = await db.user.findUnique({
            where: {
                ClerkId: user.id,
            },
        });
        return existingUser;
    }
    throw error;
}

}