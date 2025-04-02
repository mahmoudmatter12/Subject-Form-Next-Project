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

  const formFeilds = [
    {
      label: 'Arabic Name',
      name: 'arabicName',
      type: 'text',
      disabled: true,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      disabled: true,
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      type: 'tel',
      disabled: true,
    },
    {
      label: 'Student ID',
      name: 'studentId',
      type: 'text',
      disabled: true,
    },
    {
      label: 'Academic Guide',
      name: 'academicGuide',
      type: 'text',
      disabled: true,
    },
    {
      label: 'CGPA',
      name: 'cgpa',
      type: 'text',
      disabled: true,
    }
  ]

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
        {formFeilds.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-300">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              disabled={field.disabled}
              className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500  text-white cursor-not-allowed"
            />
          </div>
        ))}
        
      </form>
    </>
  )
}

export default StudentInfoForm