import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const CGPA = await db.cGPA.findMany();
    return NextResponse.json(CGPA);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// curl -X GET http://localhoat:3000/api/cgpa