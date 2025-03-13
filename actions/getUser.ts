export default async function GetUser(id: string) {
  const response = await fetch(`api/student/${id}`);
  const student = await response.json();

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
}
