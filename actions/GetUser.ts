import { db } from "@/lib/db";

export const GetUser = async (id: string) => {
  const user = db.student.findFirst({
    where: {
      clirkid: id,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};
