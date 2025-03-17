'use client'; // Mark this as a Client Component


import React from 'react'
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface StudentInfoFormProps {
  onStudentInfoChange: (info: { arabicName: string; email: string; phoneNumber: string; studentId: string; academicGuide: string; cgpa: string; }) => void;
}

function StudentInfoForm({ onStudentInfoChange }: StudentInfoFormProps) {

  const { user } = useUser();


  const [formData, setFormData] = useState({
    arabicName: '',
    email: '',
    phoneNumber: '',
    studentId: '',
    academicGuide: '',
    cgpa: '',
  });


  // const [isFormChanged, setIsFormChanged] = useState(false);

  // Fetch the student's data
  useEffect(() => {
    if (user?.id) {
      Promise.all([
        fetch(`/api/student/${user.id}`).then((res) => res.json())
      ]).then(([studentData]) => {
        const updatedFormData = {
          arabicName: studentData.arabicName || '',
          email: studentData.email,
          phoneNumber: studentData.phoneNumber || '',
          studentId: studentData.studentId,
          academicGuide: studentData.academicGuide || '',
          cgpa: studentData.cgpa || '',
        };
        setFormData(updatedFormData);
        onStudentInfoChange(updatedFormData);
      });
    }
  }, [onStudentInfoChange, user?.id]);

  return (
    <>
      <h1 className="text-2xl font-bold text-white">Student Information</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="arabicName" className="block text-sm font-medium text-gray-300">
            Arabic Name
          </label>
          <input
            type="text"
            id="arabicName"
            name="arabicName"
            value={formData.arabicName}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-not-allowed"
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-300">
            Student ID
          </label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-not-allowed"
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="academicGuide" className="block text-sm font-medium text-gray-300">
            Academic Guide
          </label>
          <input
            type="text"
            id="academicGuide"
            name="academicGuide"
            value={formData.academicGuide || 'N/A'}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-not-allowed"
            disabled
          />
        </div>
        <div>
          <label htmlFor="cgpa" className="block text-sm font-medium text-gray-300">
            CGPA
          </label>
          <input
            type="text"
            id="cgpa"
            name="cgpa"
            value={formData.cgpa || 'N/A'}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white cursor-not-allowed"
            disabled
          />
        </div>
      </form>
    </>
  )
}

export default StudentInfoForm