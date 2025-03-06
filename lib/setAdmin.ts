import { db } from "./db";
import { NextResponse } from "next/server";
import GetUser from "./GetUser";



export default async function setAdmin({ request }: { request: Request }) {

    const id = request.headers.get("id") || "";

    const user = await GetUser();

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "User is not an admin" }, { status: 403 });
    }

    const student = await db.student.findUnique({
        where: { id },
    });

    if (!student) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const updatedStudent = await db.student.update({
        where: { id },
        data: {
            role: "ADMIN",
        },
    });

    
    return NextResponse.json(updatedStudent);
    

}