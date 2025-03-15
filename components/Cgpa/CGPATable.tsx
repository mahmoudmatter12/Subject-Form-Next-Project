// components/CGPATable.tsx
"use client"; // Mark this as a client component

import React, { useEffect, useState } from "react";

interface CGPA {
  studentId: string;
  cgpa: number;
}

const CGPATable = () => {
  const [cgpaData, setCGPAData] = useState<CGPA[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch CGPA data from the API
    const fetchCGPAData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cgpa");
        if (!response.ok) {
          throw new Error("Failed to fetch CGPA data");
        }
        const data = await response.json();
        setCGPAData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCGPAData();
  }, []);

  if (loading) {
    return <p>Loading CGPA data...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-700">
          <th className="px-4 py-2 text-left">Student ID</th>
          <th className="px-4 py-2 text-left">CGPA</th>
          <th className="px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {cgpaData.map((cgpa) => (
          <tr key={cgpa.studentId} className="border-b border-gray-700">
            <td className="px-4 py-2">{cgpa.studentId}</td>
            <td className="px-4 py-2">{cgpa.cgpa.toFixed(2)}</td>
            <td className="px-4 py-2 justify-center">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 cursor-pointer">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 cursor-pointer ml-2">
                Delete
              </button>
            </td>   
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CGPATable;