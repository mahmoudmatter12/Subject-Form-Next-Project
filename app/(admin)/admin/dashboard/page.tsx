// app/admin/page.tsx
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NotAdmin from "@/components/NotAdmin";
import StudentsTable from "@/components/student/StudentsTable";
import { GetUser } from "@/lib/GetUser";
import student from "@/types/student";
import { UserButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import CGPAPieChart from "@/components/Cgpa/CGPAPieChart";

import SubjectMainComp from "@/components/Subject/SubjectMainComp";


const Admin = async () => {
  const { userId } = await auth();
  const student = await GetUser();
  const { role } = student as student;

  if (!userId) {
    redirect("/sign-in");
  }

  if (role !== "ADMIN") {
    return <NotAdmin />;
  }

  return (
    <div className="min-h-screen p-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        {/* User Icon and Name */}
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <UserButton />
          <p className="text-lg">Welcome, {student?.fname}!</p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <SignOutButton>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer">
              Sign Out
            </button>
          </SignOutButton>
          <Link
            href="/user/dashboard"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            User Dashboard
          </Link>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-700 mb-8" />

      {/* Content Section */}
      <div className="space-y-8">
        {/* All Students */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto custom-scrollbar ">
          <h2 className="text-2xl font-bold mb-4">All Students</h2>
          <table className="w-full ">
            <StudentsTable /> {/* StudentsTable is inside the table but properly structured */}
          </table>
        </div>


        {/* All Subjects */}
        <SubjectMainComp />

        {/* Opened Subjects */}
        {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto custom-scrollbar"> */}
        {/* <h2 className="text-2xl font-bold mb-4">Opened Subjects</h2> */}
        {/* <table className="w-full"> */}
        {/* Add opened subjects table content here */}
        {/* <OpenSubjectTable /> */}
        {/* </table> */}
        {/* </div> */}

        {/* Student Submissions */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Student Submissions</h2>
          <table className="w-full">
            {/* Add student submissions table content here */}
          </table>
        </div>

        {/* Statistics Based on CGPA */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Statistics Based on CGPA</h2>
          <CGPAPieChart /> {/* Use the CGPA table component here */}
        </div>
      </div>
    </div>
  );
};

export default Admin;