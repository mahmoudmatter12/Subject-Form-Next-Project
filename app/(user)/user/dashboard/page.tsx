"use server";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { getTotalSubmissions } from "@/actions/SubmitionFeedBack"; // Import function, not a value
import { getTotalEnrolledSubjects } from "@/actions/EnrolledSubjects";

export default async function DashboardPage() {
  const { userId } = await auth();


  // Fetch total submissions count
  const { totalSubmissions } = await getTotalSubmissions();
  const { totalEnrolledSubjects } = await getTotalEnrolledSubjects();

  return (
    <div className="min-h-screen text-white p-8">
      {/* Dashboard Container */}
      <div className="w-full max-w-6xl mx-auto">

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Submissions Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Submissions</h2>
            <p className="text-gray-400 mb-4">
              Total Submissions:{" "}
              <span className="text-white font-semibold">{totalSubmissions != 0 ? totalSubmissions : "No Submitions yet"}</span>
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href="/user/submission"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer text-center"
              >
                View Submissions
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Enrolled Subjects</h2>
            <p className="text-gray-400 mb-4">
              Total Enrolled Subjects:{" "}
              <span className="text-white font-semibold">{totalEnrolledSubjects != 0 ? totalEnrolledSubjects : "No Enrolled subjects "}</span>
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href={`/user/enrollments/${userId}`}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer text-center"
              >
                View Enrollments
              </Link>
            </div>
          </div>

        </div>



        <hr className="border-gray-700 mb-8 mt-8" />

        {/* Subject Form Registration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Subject Form Registration</h2>
            <p className="text-gray-400 mb-4">
              Register for your subjects for the upcoming semester.
            </p>
            <Link
              href="/user/form"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
