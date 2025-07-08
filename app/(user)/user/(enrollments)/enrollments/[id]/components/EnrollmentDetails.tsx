"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import EnrollmentDetailsSkeleton from "./EnrollmentDetailsSkelton";

interface EnrollmentDetailsProps {
  enrollments: {
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
  }[];
  loading: boolean;
}

export default function EnrollmentDetails({ enrollments ,loading }: EnrollmentDetailsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Filter and search logic
  const filteredEnrollments = enrollments && Array.isArray(enrollments) ? enrollments
    .filter(({ subject }) => {
      const matchesSearch =
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch ;
    }) : [];

  // Pagination logic
  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
  const paginatedEnrollments = filteredEnrollments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <EnrollmentDetailsSkeleton />;
  }

  return (
    <div className="bg-sky-950 p-6 rounded-lg shadow-md">
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name or code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400"
        />
      </div>


      {/* Enrollment List */}
      <div className="space-y-4 grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedEnrollments.length > 0 ? (
          paginatedEnrollments.map(({ id, subject, status, createdAt, updatedAt }) => (
            <div key={id} className="bg-cyan-900 p-4 rounded-lg">
              <p className="text-lg font-bold text-white">{subject.name}</p>
              <p className="text-sm text-gray-400">Code: {subject.subjectCode}</p>
              <p className="text-sm text-gray-400">Credit Hours: {subject.creditHours}</p>
              <p className="text-sm text-gray-400">Status: {status}</p>
              <p className="text-sm text-gray-400">Created: {new Date(createdAt).toLocaleString()}</p>
              <p className="text-sm text-gray-400">Last Updated: {new Date(updatedAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No enrollments found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}