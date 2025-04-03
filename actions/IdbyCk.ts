import { db } from "@/lib/db";

export default async function getIdbyClirckId(clirk: string) {
    const id = await db.student.findUnique({
        where: { clirkId: clirk },
        select: { id: true },
    });
    return id?.id;
}