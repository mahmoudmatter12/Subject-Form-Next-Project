'use client'; // Mark this as a Client Component

import { useEffect, useState } from 'react';
import student from '@/types/student';
import { toast } from 'react-toastify'; 

export default function StudentsTable() {
  const [students, setStudents] = useState<student[]>([]);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/${id}`, { method: 'DELETE' });
    if (response.status === 400) {
      const error = await response.json();
      toast.error(error.message);
    }
    if (response.ok) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const handelUpdate = async (id: string) => {
    const response = await fetch(`/api/admin/students/${id}`, { method: 'PUT' });
    if (response.ok) {
      setStudents(students.filter((student) => student.id !== id));
    }
  }

  useEffect(() => {
    fetch('/api/admin/students')
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);


  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Student ID</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.fname} {student.lname}</td>
              <td>{student.email}</td>
              <td>{student.studentId}</td>
              <td>
                <button className="text-blue-500 hover:underline" onClick={()=>handelUpdate(student.id)} >Edit</button>
                <button className="text-red-500 hover:underline ml-2" onClick={() => handleDelete(student.id)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}