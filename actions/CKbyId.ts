import { db } from "@/lib/db";

export default async function getIdbyClirckId(id: string) {
    const clirk = await db.student.findUnique({
        where: { id: id },
        select: { clirkId: true },
    });
    return clirk?.clirkId;
}