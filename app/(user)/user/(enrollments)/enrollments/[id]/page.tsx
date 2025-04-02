"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EnrollmentDetails from "./components/EnrollmentDetails";
import { useRouter } from "next/navigation";
interface Enrollment {
  id: string;
  subject: {
    id: string;
    name: string;
    subjectCode: string;
    creditHours: number;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserEnrollmentsPage() {
  const { id } = useParams();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch enrollments data
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch(`/api/user/enroll/${id}`);
        if (!response.ok) {
          toast.error("Failed to fetch enrollments");
          throw new Error("Failed to fetch enrollments");
        }
        const data = await response.json();
        setEnrollments(data.subjects);
      } catch (error) {
        toast.error("Failed to load enrollments");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [id]);


  return (
    <div className="min-h-screen p-6">
      <header className="mb-8 flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-6">User Enrollments</h1>
          <button onClick={() => {
            router.back();
          }} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer">
            Exit
          </button>
        </div>
        {/* total enrollments */}
        <div className="text-white mb-4">
          <div>
            <strong>
              Total Enrollments
            </strong>
          </div>
          <div className="text-2xl font-bold rounded-2xl bg-gray-800 p-2 text-center">
            {enrollments.length}
          </div>
        </div>
      </header>
      <EnrollmentDetails enrollments={enrollments} loading={loading} />
    </div>
  );
}