"use client";

export default function EnrollmentDetailsSkeleton() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      {/* Search Bar Skeleton */}
      <div className="mb-4">
        <div className="h-10 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Filter Dropdown Skeleton */}
      <div className="mb-4">
        <div className="h-10 w-[180px] bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Enrollment List Skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-cyan-900 p-4 rounded-lg">
            <div className="h-6 w-3/4 bg-gray-700 rounded-lg animate-pulse mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded-lg animate-pulse mb-1"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded-lg animate-pulse mb-1"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded-lg animate-pulse mb-1"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded-lg animate-pulse mb-1"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Pagination Controls Skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-10 w-24 bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}