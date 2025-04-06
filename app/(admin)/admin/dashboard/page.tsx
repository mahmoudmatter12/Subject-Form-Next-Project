// app/admin/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NotAdmin from "@/components/NotAdmin";
import StudentsTable from "@/components/student/StudentsTable";
import { GetUser } from "@/lib/GetUser";
import student from "@/types/student";
import CGPAPieChart from "@/components/Cgpa/CGPAPieChart";
import ManagmentGrid from "./components/ManagmentGrid";


const Admin = async () => {
  const { userId } = await auth();
  const student = await GetUser();


  if (!userId) {
    redirect("/sign-in");
  }
  if (!student && userId) {
    redirect("/onboarding");
  }
  const { role } = student as student;

  if (role !== "ADMIN") {
    return <NotAdmin />;
  }

  return (
    <div className="min-h-screen">

      {/* Content Section */}
      <div className="space-y-8">
        {/* StudentsTable is inside the table but properly structured */}
        <StudentsTable />
        {/* Managment Component */}
        <ManagmentGrid />
        {/* Statistics Based on CGPA */}
        <CGPAPieChart /> {/* Use the CGPA table component here */}
      </div>
    </div>
  );
};

export default Admin;